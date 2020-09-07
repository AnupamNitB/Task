import {StyleSheet} from 'react-native';
import {w, h, totalSize} from '../../utils/Dimensions';
import {UiColor, TextColor, TextSize} from '../../theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UiColor.BLUE,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textContainer: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: '900',
    color: TextColor.WHITE,
  },
});
