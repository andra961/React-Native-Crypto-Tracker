import {StyleSheet} from 'react-native';
import COLORS from '../../../../constants/colors';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerTitle: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 17,
  },
  rankContainer: {
    backgroundColor: COLORS.RANK,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
});

export default styles;
