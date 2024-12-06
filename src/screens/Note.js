import { Button, Dimensions, FlatList, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { noteItems } from "../utility/TestNoteData";
import { useState } from "react";


const itemWidth = Dimensions.get('window').width;

function Note ({navigation}) {

    const [isVisible, setVisible] = useState(true);

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleViews = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible(!isVisible);
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
                data={noteItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
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
                <TouchableOpacity style={styles.floatBtnStyle} onPress={toggleViews}>
                    <Icon name="add" size={30} color={Colors.white}/>
                </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.createMainNoteContainer}>
                    <TextInput style={styles.titleStyle} 
                    placeholder="Title" 
                    placeholderTextColor={Colors.grey} 
                    keyboardType="default" 
                    multiline={false}
                    underlineColorAndroid={Colors.black}/>
                    <ScrollView style={styles.noteScroll}>
                    <TextInput style={styles.noteStyle} 
                    placeholder="Type here.." 
                    placeholderTextColor={Colors.grey} 
                    keyboardType="default" 
                    multiline={true}/>
                    </ScrollView>
                    <View style={styles.noteButtonContainer}>
                        <TouchableOpacity style={styles.cancelBtnStyle} onPress={toggleViews}>
                            <Icon name="cancel" size={30} color={Colors.transparent_green} style={styles.noteCreateBtnStyle}/>
                            <Text style={styles.noteCreateTextStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveBtnStyle} onPress={toggleViews}>
                            <Icon name="save" size={30} color={Colors.transparent_green} style={styles.noteCreateBtnStyle}/>
                            <Text style={styles.noteCreateTextStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Button title="Toggle" onPress={toggleViews}/> */}
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
        marginTop: 10,
        height: 50,
        paddingHorizontal: 10
    },
    noteStyle: {
        fontWeight: 'normal',
        fontSize: 15,
        color: Colors.white,
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
    }
})




export default Note;