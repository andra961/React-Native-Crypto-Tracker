import {boughtAssets, setBoughtAssets} from '../portfolio';
import store from '../store';

describe('Portfolio slice test', () => {
  it('should be empty', () => {
    const portfolio = store.getState().portfolio;

    expect(portfolio?.loading).toBe(true);

    expect(portfolio?.boughtAssets).toStrictEqual([]);
  });

  it('should store bought assets', () => {
    const testAssets = [
      {
        id: 'test',
        unique_id: 'test',
        name: 'test',
        image: 'test',
        ticker: 'test',
        boughtQuantity: 'test',
        priceBought: 'test',
        currentPrice: 'test',
        priceChangePercentage: ' test',
      },
    ] as boughtAssets[];

    store.dispatch(setBoughtAssets(testAssets));

    const portfolio = store.getState().portfolio;

    expect(portfolio?.boughtAssets).toStrictEqual(testAssets);
  });
});
