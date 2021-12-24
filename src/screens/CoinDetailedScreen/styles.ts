import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  currentPrice: {
    color: COLORS.PRIMARY,
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 1,
    padding: 0,
  },

  name: {
    color: COLORS.PRIMARY,
    fontSize: 15,
  },

  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  priceChange: {
    color: COLORS.PRIMARY,
    fontSize: 17,
    fontWeight: '500',
  },

  input: {
    width: 130,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PRIMARY,
    padding: 10,
    fontSize: 16,
    color: COLORS.PRIMARY,
  },

  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.SEPARATOR,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default styles;
