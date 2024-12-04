import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import CustomHeader from "../components/CustomHeader";



function Reminder({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black
    }
})


export default Reminder;