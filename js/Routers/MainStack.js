

import React, {Component} from "react";

import { NativeBaseProvider,Spinner,View } from "native-base";

import { Platform, Modal, Dimensions, ImageBackground, Text } from "react-native";


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import { authTypes } from "../configs/config";



import SwitchNav from "./MainStackRouter"
import StackNav from "./HomeDrawerRouter";
// import StackNav from "./StackNav"

const { height, width } = Dimensions.get("window");
const backgroundModal = require("../../images/loadingBG.png");

const prefix = "fledglink://";


export default class MainStack extends Component {
    render(){

      const {initialRoute, profileSetUp} = this.props
      return (
        <NativeBaseProvider>
          {this.props.authType === authTypes.AUTHORIZED && <StackNav />}
          {/* {this.props.authType === authTypes.AUTHORIZED && (
           <StackNav
             uriPrefix={prefix}
             initialRoute={initialRoute}
             profileSetUp={profileSetUp}
           />
          )} */}
        </NativeBaseProvider>
      );
    }
}



