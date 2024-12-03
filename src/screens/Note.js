import { StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";




function Note (navigation) {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
            <Text>Hello world</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        color: Colors.colorOnPrimary,
        padding: 10
    }
})




export default Note;