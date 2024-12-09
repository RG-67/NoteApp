/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { createNote, deleteNote, getAllNotes } from './api/noteApi'; 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/Login';
import Registration from './screens/Registration';
import Colors from './styles/colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Note from './screens/Note';
import Reminder from './screens/Reminder';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './components/CustomDrawerContent';
import { enableScreens } from 'react-native-screens';
import Bin from './screens/Bin';
import { getCredentials } from './utility/Storage';
import { loading } from './utility/LoadingBar';
import TestScreen from './screens/TestScreen';

function App() {

  enableScreens();

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const credentials = await getCredentials();
        console.log(credentials);
        setLogin(!!credentials);
      } catch (error) {
        console.error("Error checking loging status", error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  /* if(isLoading) {
    loading();
  } */

  const AuthStack = () => {
    return(
      <Stack.Navigator initialRouteName='Login'>
        {/* <Stack.Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/> */}
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Registration' component={Registration} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={DrawerNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
    );
  }
  
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator initialRouteName='Note' screenOptions={{headerShown: false, drawerType: 'front', overlayColor: 'transparent', swipeEdgeWidth: 50,
        lazy: true, detachInactiveScreens: false}}
      drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name='Note' component={Note}/>
      <Drawer.Screen name='Reminder' component={Reminder}/>
      <Drawer.Screen name='Bin' component={Bin}/>
      </Drawer.Navigator>
    )
  }

  const Navigation = () => {
    if(isLoading) {
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.trans}}>
          <ActivityIndicator size="large" color={Colors.colorPrimaryVariant} />
        </View>
      )
    }
    return isLogin ? <DrawerNavigator/> : <AuthStack/>
    // return isLogin ? <AuthStack/>: <DrawerNavigator/>
  };

  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.colorPrimaryVariant} barStyle="light-content"/>
      {/* {isLogin ? <DrawerNavigator/> : <AuthStack/>} */}
      <Navigation/>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;