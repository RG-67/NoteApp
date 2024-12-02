/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {PropsWithChildren} from 'react';
import {
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

function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.colorPrimaryVariant} barStyle="light-content"/>
      <Stack.Navigator initialRouteName='Registration'/* 'Login' */>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Registration' component={Registration} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )

  /* const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const databaseUserId = "6724ee5418784df1125ddd3c";
  const userId = "US1730473556691689"; */

  // const isDarkMode = useColorScheme() === 'dark';

  /* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */

  /* const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getAllNotes(databaseUserId, userId);
      if (response?.status) {
      // console.log("Res Status: ", response.data);
        setNotes(response.data);
      } else {
        console.error("Failed to fetch notes: ", response?.msg);
        setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Errro in api call: ", error.message);
        setError("Falied to fetch notes");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    if (!title || !note) {
      Alert.alert("Validation error", "Title and note cannot be empty!");
      return;
    } else {
      try {
        const response = await createNote(title, note, databaseUserId, userId, "");
        if (response?.status) {
          Alert.alert("Success", response.msg);
          setTitle("");
          setNote("");
          fetchNotes();
        } else {
          Alert.alert("Errro", response?.msg || "Failed to create note");
        }
      } catch (error) {
        console.error("Error creating note", error.message);
      } 
    }
  };

  const deleteItem = async (noteDatabaseId, noteId) => {
    try {
      const response = await deleteNote(noteDatabaseId, noteId, databaseUserId, userId);
      if (response?.status) {
        Alert.alert("Successfull", response.msg);
        fetchNotes();
      } else {
        Alert.alert("Error", response?.msg || "Failed to delete note");
      }
    } catch (error) {
      console.error("Error in deleting note", error.message);
    }
  } */

  /* return (
    <View style={styles.mainContainer}>
    <TextInput style={styles.titleInputStyle} 
    placeholder='Enter title'
    placeholderTextColor="gray"
    multiline={false}
    onChangeText={setTitle}/>

    <TextInput style={styles.noteInputStyle}
    placeholder='Enter note'
    placeholderTextColor="gray"
    multiline={true}
    onChangeText={setNote}/>

    <View style={styles.submitButtonStyle}/>
    <Button title='Submit'
    color='#007AFF'
    onPress={handleCreateNote}/>

    {loading && <Text>Loading...</Text>}
    {error && <Text>Error: {error}</Text>}
    {!loading && !error && (
      <FlatList
      data={notes}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.noteId}
      renderItem={({item}) => {
        return(
          // <TouchableOpacity onPress={() => deleteItem(item._id, item.noteId)}>
          <TouchableOpacity onPress={() => deleteItem(item._id, item.noteId)}>
          <View style={styles.noteCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.note}</Text>
          <Text>{`Date: ${item.date}`}</Text>
          <Text>{`Time: ${item.time}`}</Text>
          </View>
          </TouchableOpacity>
          );
        }}
        />
      )}
    </View>
  ); */
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  noteCard: {
    padding: 10,
    marginVertical: 2,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  titleInputStyle: {
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 2,
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 10,
    height: 40
  },
  noteInputStyle: {
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 2,
    fontWeight: 'regular',
    height: 220,
    marginTop: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    textAlign: 'left',
    paddingHorizontal: 10
  },
  submitButtonStyle: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default App;