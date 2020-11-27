import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { stockSliceKey, reducer, actions } from './slice';
import { stockSaga } from './saga';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { selectStockData } from './selectors';
import HighchartWebView from 'components/HighchartWebView';

const config = {
  rangeSelector: {
    selected: 1,
  },

  title: {
    text: 'AAPL Stock Price',
  },

  series: [
    {
      name: 'AAPL',
      data: [],
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
};

const Stock = () => {
  useInjectReducer({ key: stockSliceKey, reducer: reducer });
  useInjectSaga({ key: stockSliceKey, saga: stockSaga });
  const [chartOptions, setChartOptions] = useState(config);
  const dispatch = useDispatch();
  const stcokData = useSelector(selectStockData);

  useEffect(() => {
    setChartOptions({
      rangeSelector: {
        selected: 1,
      },

      title: {
        text: 'AAPL Stock Price',
      },

      series: [
        {
          name: 'AAPL',
          data: stcokData,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    });
  }, [stcokData]);

  useEffect(() => {
    dispatch(actions.loadStockData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HighchartWebView options={chartOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 500,
  },
});

export default Stock;
