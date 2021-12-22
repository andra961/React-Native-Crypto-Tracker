import React, {Suspense} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import PortfolioAssetsList from './components/PortfolioAssetsList';

const PortfolioScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        }>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
