import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { noteItems } from "../utility/TestNoteData";


const itemWidth = Dimensions.get('window').width;

function Note ({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
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
            <TouchableOpacity style={styles.floatBtnStyle}>
                <Icon name="add" size={30} color={Colors.white}/>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: Colors.white
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
    }
})




export default Note;