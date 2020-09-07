import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {Strings} from '../../theme';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    try {
      setTimeout(() => {
        Actions.SignUp();
      }, 2000);
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textContainer}>{Strings.APP_NAME}</Text>
      </View>
    );
  }
}
export default Splash;
