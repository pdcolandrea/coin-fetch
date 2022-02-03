import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Chip } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery, useQueryClient } from 'react-query';

import axios from 'axios';
import OptionCard from '../components/card';
import CryptoChart from '../components/chart';

// react-query
const getChart = async ({ queryKey }: any) => {
  console.log(queryKey);
  let q: string = queryKey[1]; // coin
  let q2: string = queryKey[2]; // timerange
  let url = '';

  // ETH Contract Address
  if (q.startsWith('0x')) {
    url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${q}/market_chart?vs_currency=usd&days=${q2}`;
  } else {
    url = `https://api.coingecko.com/api/v3/coins/${q}/market_chart?vs_currency=usd&days=${q2}`;
  }

  const { data } = await axios.get(url, {
    headers: { accept: 'application/json' },
  });

  return data.prices.map((ele: number[]) => ({
    timestamp: ele[0],
    value: ele[1],
  }));
};

const MainScreen = () => {
  const [query, setQuery] = useState('bitcoin');
  const [time, setTime] = useState('30');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(['q', query, time], getChart);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {}, []);

  const onBTCPress = () => {
    setQuery('bitcoin');
  };

  const onETHPress = () => {
    setQuery('ethereum');
  };

  const onUSDTPress = () => {
    setQuery('0xdac17f958d2ee523a2206206994597c13d831ec7');
  };

  const onSOLPress = () => {
    setQuery('solana');
  };

  const onTimeFilterPress = () => {
    setTime(time => {
      switch (time) {
        case '1':
          return '7';
        case '7':
          return '30';
        case '30':
          return '90';
        case '90':
          return '365';
        case '365':
          return 'max';
        case 'max':
          return '1';
        default:
          return '30';
      }
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, width: "85%" }}>{query}</Text>
        <Chip title={`${time}d`} onPress={onTimeFilterPress} />
      </View>
      <CryptoChart isLoading={isLoading} isError={isError} data={data} />

      <ScrollView>
        <OptionCard
          title="Bitcoin"
          body="Bitcoin is cool mmmmmkay"
          onPress={onBTCPress}
        />
        <OptionCard
          title="Ethereum"
          body="Enjoy your gas fees"
          onPress={onETHPress}
        />
        <OptionCard
          title="Solana"
          body="Fees are not as high here"
          onPress={onSOLPress}
        />
        <OptionCard
          title="USDT"
          body="USDT is not cool mmmmmmkay"
          onPress={onUSDTPress}
        />
        <OptionCard title="Custom [ERC20]" setQuery={setQuery} custom />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MainScreen;
