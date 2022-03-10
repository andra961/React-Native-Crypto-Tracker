import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CoinDetailedHeader from './CoinDetailedHeader';

//mock redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({watchlistCoins: [], loading: false})),
  useDispatch: () => mockDispatch,
}));

it('renders correctly', () => {
  renderer.create(
    <CoinDetailedHeader coinId="" image="" symbol="" marketCapRank={3} />,
  );
});
