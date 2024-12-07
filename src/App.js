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

function App() {

  enableScreens();

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  

  useEffect(() => {
    const checkLogin = async () => {
      const credentials = await getCredentials();
      console.log(credentials);
      setLogin(!!credentials);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if(isLoading) {
    loading();
  }

  const AuthStack = () => {
    return(
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Registration' component={Registration} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={DrawerNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
    );
  }
  
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator initialRouteName='Note' screenOptions={{headerShown: false, drawerType: 'front', overlayColor: 'transparent', swipeEdgeWidth: 50}}
      drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name='Note' component={Note}/>
      <Drawer.Screen name='Reminder' component={Reminder}/>
      <Drawer.Screen name='Bin' component={Bin}/>
      </Drawer.Navigator>
    )
  }

  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.colorPrimaryVariant} barStyle="light-content"/>
      {/* <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Registration' component={Registration} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={DrawerNavigator} options={{headerShown: false}}/>
      </Stack.Navigator> */}
      {isLogin ? <DrawerNavigator/> : <AuthStack/>}
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default App;