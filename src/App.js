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
  BackHandler,
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
import { getCredentials, removeCredentials } from './utility/Storage';
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

    const backAction = () => {
      if(isLogin) {
        Alert.alert("Alert!", "Are you sure you want to exit?", [
          {text: "Cancel", style: "cancel"},
          {text: "Yes", onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [isLogin]);


  const handleLogOut = async () => {
    const removeCred = await removeCredentials();
    if(removeCred) {
      setLogin(false);
    } else {
      console.log("Credentials not removed..");
    }
  }

  if (isLoading) {
    return (
      <View style={styles.progressIndicator}>
        <ActivityIndicator size="large" color={Colors.colorOnPrimary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.colorPrimaryVariant} barStyle="light-content"/>
      {isLogin? (
        <Drawer.Navigator initialRouteName='Note' screenOptions={{headerShown: false, drawerType: 'front', overlayColor: 'transparent', swipeEdgeWidth: 50,
          lazy: true, detachInactiveScreens: false}}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} onLogOut={handleLogOut}/>
          )}>
          <Drawer.Screen name='Note' component={Note}/>
          <Drawer.Screen name='Reminder' component={Reminder}/>
          <Drawer.Screen name='Bin' component={Bin}/>
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name='Login' options={{headerShown: false}}>{props => <Login {...props} onLoginSuccess={() => setLogin(true)}/>}</Stack.Screen>
          <Stack.Screen name='Registration' component={Registration} options={{headerShown: false}}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  progressIndicator: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})

export default App;