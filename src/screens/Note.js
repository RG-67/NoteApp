import { Alert, Button, Dimensions, FlatList, LayoutAnimation, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCallback, useEffect, useState } from "react";
import { loading } from "../utility/LoadingBar";
import { createNote, getAllNotes, setBinNote, updateNote } from "../api/noteApi";
import { getCredentials } from "../utility/Storage";
import { formattedDate, mergedDateTime, showToast } from "../utility/Constants";
import { useFocusEffect } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


let ntDate = "", reminderDateTime = "";
const itemWidth = Dimensions.get('window').width;

function Note ({navigation}) {

    const [isVisible, setVisible] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isModalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState("");
    const [isTitle, setTitle] = useState(item?.title || "");
    const [isNote, setNote] = useState(item?.note || "");

    
    const getNotes = async () => {
        try{
            const {databaseUserId, userId} = await getCredentials();
            const response = await getAllNotes(databaseUserId, userId);
            setLoading(false);
            if (response?.status === true) {
                setNotes(response?.data);
            } else {
                setNotes([]);
            }
            showToast(response?.msg);
        } catch(error) {
            setLoading(false);
            console.error(error);
        }
    }

    const setCreateNote = () => {
        if(isTitle === "") {
            showToast("Title should not empty");
        } else if(isNote === "") {
            showToast("Note field should not empty");
        } else {
            if (item !== "") {
                updateUserNote();
            } else {
                createUserNote();   
            }
        }
    }

    const createUserNote = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            const response = await createNote(isTitle, isNote, databaseUserId, userId, reminderDateTime);
            if(response?.status === true) {
                getNotes();
            }
            setEmptyField();
            showToast(response?.msg);
        } catch (error) {
            console.error("Error to create note ==>", error);
        }
    }

    const updateUserNote = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            const response = await updateNote(item._id, item.noteId, isTitle, isNote, databaseUserId, userId);
            if(response?.status === true) {
                getNotes();
            }
            setEmptyField();
            showToast(response?.msg);
        } catch (error) {
            console.log("Error to update note ==>", error)
        }
    }

    const setUserBinNote = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            const response = await setBinNote(item._id, item.noteId, databaseUserId, userId);
            if(response?.status === true) {
                setItem("");
                getNotes();
            }
            showToast(response?.msg);
        } catch (error) {
            console.log("Error to set bin note ==>", error);
        }
    }

    const setEmptyField = () => {
        setItem("");
        toggleViews();
        setTitle("");
        setNote("");
        ntDate = "";
        reminderDateTime = "";
    }

    useFocusEffect(
        useCallback(() => {
            getNotes();
        }, [])
    );

    /* useEffect(() => {
        getNotes();
    }, []); */

    if(isLoading) {
        loading();
    }

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleViews = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible(!isVisible);
    }

    const showPicker = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            mode: currentMode,
            is24Hour: true,
            onChange: (event, selectedValue) => {
                if(selectedValue) {
                    if(currentMode === 'date') {
                        console.log("Selected date ===>", selectedValue.toLocaleDateString());
                        ntDate = selectedValue.toLocaleDateString();
                        showPicker('time');
                    }
                    else if(currentMode === 'time') {
                        console.log("Selected time ===>", selectedValue.toLocaleTimeString());
                        try {
                            reminderDateTime = mergedDateTime(formattedDate(ntDate), selectedValue.toLocaleTimeString());
                            console.log("Formatted date and time ==>", reminderDateTime);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        });
    }

    const handleItemClick = (noteItem, from) => {
        if(from === "itemClick") {
            setItem(noteItem);
            setModalVisible(true);
        } else if(from === "modalBtn") {
            setModalVisible(false);
            toggleViews();
            setTitle(item.title);
            setNote(item.note);
        } else if(from === "cancelBtn") {
            setModalVisible(false);
            showAlertDialog();
        } else {
            setItem("");
            setModalVisible(false);
        }
    }


    const showAlertDialog = () => {
        Alert.alert("Alert!", 
            "Are you sure want to delete the note?", 
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel button pressed.."),
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => setUserBinNote(),
                style: "destructive"
            }
        ], 
        {cancelable: false}
    );
    }

    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
            {isVisible ? (
                <View style={{flex: 1}}>
                <View style={styles.searchContainer}>
                <TextInput style={styles.searchTextStyle} multiline={false} placeholder="Search here.." placeholderTextColor={Colors.grey} keyboardType='default'/>
                <Icon name="search" size={30} color={Colors.colorPrimaryVariant} style={{marginEnd: 10}}/>
                </View>
                <FlatList
                data={notes}
                keyExtractor={(item) => item._id}
                numColumns={2}
                initialNumToRender={10}
                onEndReached={() => console.log("Fetch more data here")}
                // ListFooterComponent={loading? loading() : null}
                columnWrapperStyle={styles.wrapperStyle}
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleItemClick(item, "itemClick")}>
                <View style={styles.mainItemContainer}>
                <Text style={styles.dateAndTimeStyle}>{item.date}</Text>
                <Text style={styles.dateAndTimeStyle}>{item.time}</Text>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitleStyle}>{item.title}</Text>
                    <Text style={styles.noteTextStyle}>{item.note}</Text>
                </View>
                </View>
                </TouchableOpacity>
            )}
                style={styles.noteItemContainer}/>
                <TouchableOpacity style={styles.floatBtnStyle} onPress={toggleViews}>
                    <Icon name="add" size={30} color={Colors.white}/>
                </TouchableOpacity>
                <Modal 
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.insideModalStyle}>
                    <MCIcon name="close-box-outline" size={30} color={Colors.red} style={styles.McIconStyle} onPress={() => handleItemClick("", "closeBtn")}/>
                    <Icon.Button name="edit-note" size={30} color={Colors.white} style={styles.updateModalIconStyle}
                    onPress={() => handleItemClick("", "modalBtn")}>
                        <Text style={styles.modalIconTextStyle}>Edit</Text>
                    </Icon.Button>
                    
                    <Icon.Button name="delete-forever" size={30} color={Colors.white} style={styles.deleteModalIconStyle}
                    onPress={() => handleItemClick("", "cancelBtn")}>
                        <Text style={styles.modalIconTextStyle}>Delete</Text>
                    </Icon.Button>
                    </View>
                    </View>
                </Modal>
                </View>
            ) : (
                <View style={styles.createMainNoteContainer}>
                    <TouchableOpacity style={styles.reminderStyle} onPress={() => showPicker('date')}>
                    <Icon name="notification-add" size={30} color={Colors.colorPrimaryVariant}/>
                    </TouchableOpacity>
                    <TextInput style={styles.titleStyle} 
                    placeholder="Title" 
                    placeholderTextColor={Colors.grey} 
                    keyboardType="default" 
                    multiline={false}
                    underlineColorAndroid={Colors.black}
                    value={isTitle}
                    onChangeText={setTitle}/>
                    <ScrollView style={styles.noteScroll}>
                    <TextInput style={styles.noteStyle} 
                    placeholder="Type here.." 
                    placeholderTextColor={Colors.grey} 
                    keyboardType="default" 
                    multiline={true}
                    value={isNote}
                    onChangeText={setNote}/>
                    </ScrollView>
                    <View style={styles.noteButtonContainer}>
                        <TouchableOpacity style={styles.cancelBtnStyle} onPress={setEmptyField}>
                            <Icon name="cancel" size={30} color={Colors.transparent_green} style={styles.noteCreateBtnStyle}/>
                            <Text style={styles.noteCreateTextStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveBtnStyle} /* onPress={toggleViews} */ onPress={setCreateNote}>
                            <Icon name="save" size={30} color={Colors.transparent_green} style={styles.noteCreateBtnStyle}/>
                            <Text style={styles.noteCreateTextStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: Colors.light_green
    },
    searchContainer: {
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.colorPrimaryVariant,
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchTextStyle: {
        marginHorizontal: 5,
        fontSize: 15,
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        color: Colors.black,
        flex: 1
    },
    floatBtnStyle: {
        borderRadius: 50,
        height: 50,
        width: 50,
        backgroundColor: Colors.colorOnPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        elevation: 5,
        bottom: 40,
        right: 20,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3
    },
    noteItemContainer: {
        marginTop: 10,
        marginHorizontal: 5
    },
    wrapperStyle: {
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    mainItemContainer: {
        borderRadius: 10,
        backgroundColor: Colors.sallow_green,
        flex: 1,
        margin: 5,
        paddingHorizontal: 5,
        paddingTop: 5,
        minHeight: 100,
        maxWidth: itemWidth / 2 - 15
    },
    dateAndTimeStyle: {
        fontWeight: 'bold',
        color: Colors.white,
        fontSize: 13,
        fontFamily: 'sans-serif'
    },
    noteContainer: {
        borderRadius: 10,
        backgroundColor: Colors.white,
        flex: 1,
        padding: 5,
        width: '100%',
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
        minHeight: 150
    },
    noteTitleStyle: {
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: 14,
        fontFamily: 'sans-serif',
        alignSelf: 'center'
    },
    noteTextStyle: {
        fontWeight: 'normal',
        color: Colors.black,
        fontSize: 13,
        fontFamily: 'sans-serif'
    },
    createMainNoteContainer: {
        flex: 1,
        backgroundColor: Colors.white, 
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.black,
        fontFamily: 'sans-serif',
        marginHorizontal: 10,
        height: 50,
        paddingHorizontal: 5
    },
    noteStyle: {
        fontWeight: 'normal',
        fontSize: 15,
        color: Colors.black,
        fontFamily: 'sans-serif',
        height: 'auto'
    },
    noteScroll: {
        marginHorizontal: 10, 
        marginBottom: 20
    },
    noteButtonContainer: {
        flexDirection: 'row',
        height: 55,
        bottom: 10,
        marginHorizontal: 10
    },
    cancelBtnStyle: {
        flex: 1,
        right: 5,
        backgroundColor: Colors.sallow_green,
        flexDirection: 'row'
    },
    saveBtnStyle: {
        flex: 1,
        left: 5,
        backgroundColor: Colors.colorOnPrimary,
        flexDirection: 'row'
    },
    noteCreateBtnStyle: {
        alignSelf: 'center',
        marginStart: 10
    },
    noteCreateTextStyle: {
        fontFamily:'sans-serif',
        color: Colors.transparent_green,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        left: 30
    },
    reminderStyle: {
        color: Colors.colorOnPrimary,
        backgroundColor: Colors.transparent_green,
        width: 80,
        height: 30,
        alignSelf: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginEnd: 10
    },
    modalContainer: {
        justifyContent: "flex-end",
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    insideModalStyle: {
        width: itemWidth,
        backgroundColor: Colors.white,
        padding: 10,
        gap: 10
    },
    McIconStyle: {
        alignSelf: 'flex-end'
    },
    updateModalIconStyle: {
        backgroundColor: Colors.sallow_green
    },
    deleteModalIconStyle: {
        backgroundColor: Colors.red
    },
    modalIconTextStyle: {
        fontSize: 20, 
        color: Colors.white, 
        alignSelf: 'center', 
        fontWeight: 'bold'
    }
})




export default Note;