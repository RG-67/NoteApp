import { Alert, Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Colors from "../styles/colors";
import { useCallback, useEffect, useState } from "react";
import { getCredentials } from "../utility/Storage";
import { deleteNote, getBinNotes, restoreNote, setBinNote } from "../api/noteApi";
import { showToast } from "../utility/Constants";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';



const itemWidth = Dimensions.get('window').width;

const Bin = ({navigation}) => {

    const [notes, setNotes] = useState([]);
    const [item, setItem] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const getBnNotes = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            const response = await getBinNotes(databaseUserId, userId);
            if(response?.status === true) {
                setNotes(response?.data);
            } else {
                setNotes([]);
            }
            showToast(response?.msg);
        } catch (error) {
            console.error("getBinNoteErr ==>", error);
        }
    }

    const restoreUserBinNote = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            const response = await restoreNote(item._id, item.noteId, databaseUserId, userId);
            if(response?.status === true) {
                getBnNotes();
            }
            showToast(response?.msg);
        } catch (error) {
            console.error("Error to restore note ==>", error);
        }
    }

    const deleteBinNote = async () => {
        try {
            const {databaseUserId, userId} = await getCredentials();
            // console.log("w,dfhjkdhsw ==>", `${item._id}, ${item.noteId}, ${databaseUserId}, ${userId}}`);
            const response = await deleteNote(item._id, item.noteId, databaseUserId, userId);
            if(response?.status === true) {
                setItem("");
                getBnNotes();
            }
            showToast(response?.msg);
        } catch (error) {
            console.error("Error to delete note ==>", error);
        }
    }

    /* useEffect(() => {
        getBnNotes();
    }, []); */


    useFocusEffect(
        useCallback(() => {
            getBnNotes();
        }, [])
    );


    const handleItemClick = (item, from) => {
        if(from === "itemClick") {
            setItem(item);
            setModalVisible(true);
        } else if(from === "closeBtn") {
            setItem("");
            setModalVisible(false);
        } else if(from === "modalBtn") {
            setModalVisible(false);
            restoreUserBinNote();
        } else if(from === "cancelBtn") {
            setModalVisible(false);
            showAlertDialog();
        }
    }

    const showAlertDialog = () => {
        Alert.alert("Alert!",
            "Are you sure want to permanently delete the note?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel button pressed.."),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteBinNote(),
                    style: "destructive"
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
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
                <Modal 
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                    <View style={styles.insideModalStyle}>
                    <MCIcon name="close-box-outline" size={30} color={Colors.red} style={styles.McIconStyle} onPress={() => handleItemClick("", "closeBtn")}/>
                    <Icon.Button name="settings-backup-restore" size={30} color={Colors.white} style={styles.restoreModalIconStyle}
                    onPress={() => handleItemClick("", "modalBtn")}>
                        <Text style={styles.modalIconTextStyle}>Restore</Text>
                    </Icon.Button>
                    
                    <Icon.Button name="delete-forever" size={30} color={Colors.white} style={styles.deleteModalIconStyle}
                    onPress={() => handleItemClick("", "cancelBtn")}>
                        <Text style={styles.modalIconTextStyle}>Delete</Text>
                    </Icon.Button>
                    </View>
                    </View>
                </Modal>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: Colors.white
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
    noteItemContainer: {
        marginTop: 10,
        marginHorizontal: 5
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
    restoreModalIconStyle: {
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
});


export default Bin;