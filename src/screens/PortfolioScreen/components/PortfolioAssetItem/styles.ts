import {StyleSheet} from 'react-native';
import COLORS from '../../../../constants/colors';

const styles = StyleSheet.create({
  title: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  ticker: {
    color: COLORS.DEFAULT_GREY,
    fontWeight: '700',
  },
  coinContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
});

export default styles;
