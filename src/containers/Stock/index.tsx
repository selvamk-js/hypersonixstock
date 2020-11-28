import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { isEmpty } from 'lodash';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import HighchartWebView from 'components/HighchartWebView';
import {
  Avatar,
  Button,
  Card,
  Colors,
  Divider,
  IconButton,
  Subheading,
} from 'react-native-paper';
import { useStyles } from 'styles/index';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from 'app/components/AuthContext';
import { IAuthContextType } from 'app/types';
import { stockSliceKey, reducer, actions } from './slice';
import { stockSaga } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { selectStockData, selectStockDataInfo } from './selectors';

const config = {
  title: {
    text: 'AAPL stock price by minute',
  },

  subtitle: {
    text: 'Using ordinal X axis',
  },

  xAxis: {
    gapGridLineWidth: 0,
  },

  rangeSelector: {
    buttons: [
      {
        type: 'day',
        count: 1,
        text: '1D',
      },
      {
        type: 'month',
        count: 3,
        text: '3m',
      },
      {
        type: 'year',
        count: 1,
        text: '1y',
      },
      {
        type: 'ytd',
        text: 'YTD',
      },
    ],
    selected: 1,
    inputEnabled: false,
  },

  series: [
    {
      name: 'AAPL',
      type: 'area',
      data: [],
      gapSize: 5,
      tooltip: {
        valueDecimals: 2,
      },
      color: '#00B897',
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, '#00CBA6'],
          [1, '#B9FFF2'],
        ],
      },
      threshold: null,
    },
  ],
  exporting: {
    enabled: false,
  },
};

const Stock = () => {
  useInjectReducer({ key: stockSliceKey, reducer: reducer });
  useInjectSaga({ key: stockSliceKey, saga: stockSaga });
  const [chartOptions, setChartOptions] = useState(config);
  const dispatch = useDispatch();
  const stcokData = useSelector(selectStockData);
  const stockInfo = useSelector(selectStockDataInfo);
  const navigation = useNavigation();
  const { signOut } = useContext<IAuthContextType>(AuthContext);

  useEffect(() => {
    const isSignedIn = async () => {
      const value = await GoogleSignin.isSignedIn();
      console.log(value);
    };
    isSignedIn();
  }, []);

  const _signOutAsync = useCallback(async () => {
    await AsyncStorage.clear();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    signOut();
  }, [signOut]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Button
            mode="text"
            theme={{ colors: { primary: '#FFFFFF' }, roundness: 25 }}
            onPress={_signOutAsync}
          >
            Sign Out
          </Button>
        </View>
      ),
    });
  }, [navigation, _signOutAsync]);

  useEffect(() => {
    setChartOptions({
      title: {
        text: !isEmpty(stockInfo)
          ? `${stockInfo['2. Symbol']} ${stockInfo['1. Information']}`
          : '',
      },
      subtitle: {
        text: 'Using ordinal X axis',
      },
      xAxis: {
        gapGridLineWidth: 0,
      },
      rangeSelector: {
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1D',
          },
          {
            type: 'month',
            count: 1,
            text: '1m',
          },
          {
            type: 'year',
            count: 1,
            text: '1y',
          },
        ],
        selected: 1,
        inputEnabled: false,
      },

      series: [
        {
          name: 'AAPL',
          type: 'area',
          data: stcokData,
          gapSize: 5,
          tooltip: {
            valueDecimals: 2,
          },
          color: '#00B897',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, '#00CBA6'],
              [1, '#B9FFF2'],
            ],
          },
          threshold: null,
        },
      ],
      exporting: {
        enabled: false,
      },
    });
  }, [stcokData, stockInfo]);

  useEffect(() => {
    dispatch(actions.loadStockData());
  }, [dispatch]);
  const GStyles = useStyles();

  const LeftContent = (lprops: any) => (
    <Avatar.Icon
      {...lprops}
      style={localStyles.avatar}
      icon="chart-timeline"
      color={Colors.cyanA700}
    />
  );
  const RightContent = (rprops: any) => (
    <View {...rprops}>
      <IconButton
        icon="reload"
        color={Colors.amber900}
        size={25}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );

  return (
    <View style={GStyles.background.root}>
      <StatusBar barStyle="light-content" />
      <Card style={GStyles.card.root}>
        <Card.Title
          title={<Subheading>Live Stock Data</Subheading>}
          subtitle={
            !isEmpty(stockInfo)
              ? `Last Refreshed On: ${stockInfo['3. Last Refreshed']}`
              : ''
          }
          left={LeftContent}
          right={RightContent}
          rightStyle={localStyles.rightView}
        />
        <Divider />
        <View style={localStyles.cardContent}>
          {!isEmpty(stcokData) && (
            <HighchartWebView
              options={chartOptions}
              styles={localStyles.wvContainer}
            />
          )}
        </View>
      </Card>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
  },
  cardContent: {
    paddingVertical: 5,
  },
  rightView: {
    margin: 5,
  },
  wvContainer: { borderRadius: 10 },
  avatar: {
    backgroundColor: Colors.cyan50,
  },
});

export default Stock;
