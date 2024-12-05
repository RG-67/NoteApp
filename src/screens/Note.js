import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Icon from 'react-native-vector-icons/MaterialIcons';

function Note ({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
            <View style={styles.searchContainer}>
            <TextInput style={styles.searchTextStyle} multiline={false} placeholder="Search here.." placeholderTextColor={Colors.grey} keyboardType='default'/>
            <Icon name="search" size={30} color={Colors.colorPrimaryVariant} style={{marginEnd: 10}}/>
            </View>
            <TouchableOpacity style={styles.floatBtnStyle}>
                <Icon name="add" size={30} color={Colors.white}/*  style={{alignSelf: 'center'}} *//>
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
    }
})




export default Note;