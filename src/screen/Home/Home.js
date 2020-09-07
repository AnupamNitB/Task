import React from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import styles from './styles';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  handleBackButton = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert('Exit App', 'Do you want to exit?', [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    }
  };
  componentDidMount = () => {
    this.setDestination();
  };

  setDestination = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        this.props.lat
      },${this.props.log}&key=AIzaSyCtIZ0E4yzvGqwBYXiNv9DxqvMRqeI3_pg`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      },
    )
      .then(res => res.json())
      .then(response => {
        if (response.status == 'OK') {
          var add = response.results[0].formatted_address;
          this.setState({address: add});
        } else {
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const {email_add} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text>{email_add}</Text>
        <Text style={{paddingHorizontal: 32}}>{this.state.address}</Text>

        <TouchableOpacity
          onPress={this.handleBackButton}
          style={[styles.buttonContainer, styles.signupButton]}>
          <Text style={styles.signUpText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;
