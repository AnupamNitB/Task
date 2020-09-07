import {StyleSheet} from 'react-native';
import {w, h, totalSize} from '../../utils/Dimensions';
import {UiColor, TextColor, TextSize} from '../../theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    height: h(8.5),
    width: w(55),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: w(3),
  },
  signupButton: {
    marginTop: w(5),
    backgroundColor: UiColor.PINK,
    alignSelf: 'center',
  },
  signUpText: {
    color: UiColor.WHITE,
    fontSize: TextSize.h1,
    fontWeight: 'bold',
  },
});
