import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";
import { useRoute } from "@react-navigation/native";

const  CustomHeader = ({navigation}) => {
    const route = useRoute();

    const getHeader = () => {
        switch (route.name) {
            case 'Note':
                return 'Note';
                break;
            case 'Reminder':
                return 'Reminder';
                break;
            case 'Bin':
                return 'Bin';
                break;
            default:
                return 'Header';
                break;
        }
    }


    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuHeader}>
                <Text style={styles.menuStyle}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerStyle}>{getHeader()}</Text>
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
        justifyContent: 'center', 
        alignItems: 'center'
    }
})


export default CustomHeader;