import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Icon from 'react-native-vector-icons/MaterialIcons';


// search

function Note (navigation) {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
            <View style={styles.searchContainer}>
            <TextInput style={styles.searchTextStyle}/>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: Colors.colorOnPrimary
    },
    searchContainer: {
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.colorPrimaryVariant,
        marginHorizontal: 15,
        marginTop: 10
    },
    searchTextStyle: {

    }
})




export default Note;