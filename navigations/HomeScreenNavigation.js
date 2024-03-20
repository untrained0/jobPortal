import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "../app/SignUpScreen";
import LoginScreen from "../app/LoginScreen";
import WelcomeScreen from "../app/WelcomeScreen";

const Stack = createStackNavigator();

const screenOptions = {
  // tabBarShowLabel:false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* <Stack.Screen name="CaptionDetail" component={CaptionDetail} /> */}
    </Stack.Navigator>
  );
}
