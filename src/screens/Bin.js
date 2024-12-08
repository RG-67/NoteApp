import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Colors from "../styles/colors";
import { useCallback, useEffect, useState } from "react";
import { getCredentials } from "../utility/Storage";
import { getBinNotes } from "../api/noteApi";
import { showToast } from "../utility/Constants";
import { useFocusEffect } from "@react-navigation/native";



const itemWidth = Dimensions.get('window').width;

const Bin = ({navigation}) => {

    const [notes, setNotes] = useState([]);

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

    /* useEffect(() => {
        getBnNotes();
    }, []); */


    useFocusEffect(
        useCallback(() => {
            getBnNotes();
        }, [])
    );

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
                <View style={styles.mainItemContainer}>
                <Text style={styles.dateAndTimeStyle}>{item.date}</Text>
                <Text style={styles.dateAndTimeStyle}>{item.time}</Text>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitleStyle}>{item.title}</Text>
                    <Text style={styles.noteTextStyle}>{item.note}</Text>
                </View>
                </View>
            )}
                style={styles.noteItemContainer}/>
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

});


export default Bin;