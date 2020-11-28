import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { isEmpty } from 'lodash';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockSliceKey, reducer, actions } from './slice';
import { stockSaga } from './saga';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { selectStockData, selectStockDataInfo } from './selectors';
import HighchartWebView from 'components/HighchartWebView';
import {
  Avatar,
  Card,
  Colors,
  Divider,
  IconButton,
  Subheading,
} from 'react-native-paper';
import { useStyles } from 'styles/index';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={GStyles.background.root}>
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
    </SafeAreaView>
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
