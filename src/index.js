import React from 'react';
import {Scene, Router, Actions, Drawer, Stack} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Dimensions, Image} from 'react-native';
import Splash from './screen/Splash';
import SignUp from './screen/SignUp';
import Home from './screen/Home';

var width = Dimensions.get('window').width;
const RouterWithRedux = connect()(Router);

const Root = () => {
  return (
    <RouterWithRedux navigationBarStyle={{backgroundColor: '#5dca67'}}>
      <Scene key="root" hideNavBar hideTabBar>
        <Stack key="app">
          <Scene
            component={Splash}
            hideNavBar={true}
            key="Splash"
            title="Splash"
            initial={true}
          />
          <Scene
            component={SignUp}
            hideNavBar={true}
            key="SignUp"
            title="SignUp"
          />
          <Scene component={Home} hideNavBar={true} key="Home" title="Home" />
        </Stack>
      </Scene>
    </RouterWithRedux>
  );
};

export default Root;
console.disableYellowBox = true;
