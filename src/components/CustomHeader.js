import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";



const  CustomHeader = (navigation) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => navigation.toogleDrawer()} style={styles.menuHeader}>
                <Text style={styles.menuStyle}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerStyle}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: Colors.colorPrimaryVariant,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    menuStyle: {
        fontSize: 24,
        color: Colors.white
    },
    headerStyle: {
        fontSize: 15,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'sans-serif',
        flex: 1,
        textAlign: 'center'
    },
    menuHeader: {
        width: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})


export default CustomHeader;