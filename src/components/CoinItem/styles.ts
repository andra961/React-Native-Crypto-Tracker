import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  title: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  text: {
    color: COLORS.PRIMARY,
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.SEPARATOR,
    padding: 15,
  },

  rank: {
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },

  rankContainer: {
    backgroundColor: COLORS.RANK,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default styles;
