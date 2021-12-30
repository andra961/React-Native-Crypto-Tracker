import React, {Suspense} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import PortfolioAssetsList from './components/PortfolioAssetsList';

const PortfolioScreen = () => {
  return (
    <View style={{flex: 1}}>
      <PortfolioAssetsList />
    </View>
  );
};

export default PortfolioScreen;
