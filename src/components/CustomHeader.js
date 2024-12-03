import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";



const  CustomHeader = (navigation) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => navigation.toogleDrawer()}>
                <Text style={styles.menuStyle}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerStyle}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        backgroundColor: Colors.black,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignContent: 'center'
    },
    menuStyle: {
        fontSize: 24,
        color: Colors.black
    },
    headerStyle: {
        fontSize: 15,
        color: Colors.black,
    }
})


export default CustomHeader;