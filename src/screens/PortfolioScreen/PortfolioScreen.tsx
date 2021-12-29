import React, {Suspense} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import PortfolioAssetsList from './components/PortfolioAssetsList';

//wrap <PortfolioAssetsList /> with the following to switch to recoil state
/*
<Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        }>
        <PortfolioAssetsList />
</Suspense>*/

const PortfolioScreen = () => {
  return (
    <View style={{flex: 1}}>
      <PortfolioAssetsList />
    </View>
  );
};

export default PortfolioScreen;
