import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

interface CryptoChartProps {
  data: [];
  isLoading: boolean;
  isError: boolean;
}

const CryptoChart = ({ data, isLoading, isError }: CryptoChartProps) => {
  if (isLoading || isError) {
    const text = isLoading ? 'Loading...' : 'Error';
    return (
      <View
        style={{ height: 200, alignSelf: 'center', justifyContent: 'center' }}>
        <Text>{text}</Text>
      </View>
    );
  }

  return (
    <View style={{ height: 200, marginTop: 20 }}>
      <LineChart.Provider data={data}>
        <LineChart height={200}>
          <LineChart.Path />
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip position="top">
              <LineChart.PriceText
                precision={2}
                format={({ value }) => {
                  'worklet';
                  const formatPrice = (value: string) => {
                    return value;
                  };

                  const formattedPrice = formatPrice(value);
                  return formattedPrice;
                }}
              />
            </LineChart.Tooltip>
            <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
    </View>
  );
};

export default CryptoChart;
