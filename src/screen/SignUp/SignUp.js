import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  AlertIOS,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import {userDetailsAPI} from '../../reduxprovider/actions/ActionUserDetails';
import {connect} from 'react-redux';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      currentLongitude: '', //Initial Longitude
      currentLatitude: '', //Initial Latitude
    };
  }

  /**
|--------------------------------------------------
| Handel Functions
|--------------------------------------------------
*/
  componentDidMount = () => {
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };
  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({currentLongitude: currentLongitude});
      //Setting state Longitude to re re-render the Longitude Text
      that.setState({currentLatitude: currentLatitude});
      //Setting state Latitude to re re-render the Longitude Text
    });
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

  _handleValidation = () => {
    const {email, password} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '' || email == null || email == undefined) {
      Platform.select({
        ios: () => {
          AlertIOS.alert('Please Enter Your Email ');
        },
        android: () => {
          ToastAndroid.show('Please Enter Your Email ', ToastAndroid.SHORT);
        },
      })();
    } else if (reg.test(this.state.email) === false) {
      Platform.select({
        ios: () => {
          AlertIOS.alert('Your Email is not correct');
        },
        android: () => {
          ToastAndroid.show('Your Email is not correct', ToastAndroid.SHORT);
        },
      })();
    } else if (password == '' || password == null || password == undefined) {
      Platform.select({
        ios: () => {
          AlertIOS.alert('Please Enter Your password ');
        },
        android: () => {
          ToastAndroid.show('Please Enter Your password ', ToastAndroid.SHORT);
        },
      })();
    } else {
      const data = {
        email: email,
        password: password,
      };
      this.props.userDetailsAPI(data);
    }
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {/**********
              Email
              ***********/}
            <TextInput
              style={styles.inputs}
              placeholder="  Email"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({email: email})}
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            {/**********
              Password
             ***********/}
            <TextInput
              style={styles.inputs}
              placeholder="  Password"
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              keyboardType="email-address"
              onChangeText={(password) => this.setState({password: password})}
              value={this.state.password}
            />
          </View>

          {/**********
              SignInButton   
             ***********/}
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() =>
              this._handleValidation({
                lat: this.state.currentLatitude,
                log: this.state.currentLongitude,
                email_add: this.state.email,
              })
            }>
            <Text style={styles.signInText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ReducerUserDetails: state.ReducerUserDetails,
    ReducerLoadingScreen: state.ReducerLoadingScreen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetailsAPI: (data) => dispatch(userDetailsAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
