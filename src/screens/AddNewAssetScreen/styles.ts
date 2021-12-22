import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: COLORS.GREY,
    borderWidth: 1,
    borderColor: COLORS.GREY_BORDER,
    borderRadius: 5,
  },

  itemText: {
    color: COLORS.PRIMARY,
  },

  textInput: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: COLORS.GREY_BORDER,
    borderRadius: 5,
    backgroundColor: COLORS.GREY,
    color: COLORS.PRIMARY,
  },

  ticker: {
    color: COLORS.DEFAULT_GREY,
    fontWeight: '700',
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },

  boughtQuantityContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },

  buttonContainer: {
    backgroundColor: COLORS.BLUE,
    padding: 10,
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: COLORS.PRIMARY,
    fontSize: 17,
    fontWeight: '600',
  },

  pricePerCoin: {
    color: COLORS.DEFAULT_GREY,
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.5,
  },
});

export default styles;
