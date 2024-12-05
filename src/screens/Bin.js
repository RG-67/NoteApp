import { StyleSheet, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Colors from "../styles/colors";



const Bin = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation}/>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: Colors.white
    },
})


export default Bin;