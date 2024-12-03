import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";

const CustomDrawerContent = () => {
    return (
        <View>
            <Image source={require('../assets/images/avatar.png')} style={styles.imageStyle}/>
            <Text style={styles.title}>Notes App</Text>
            <Text style={styles.userName}>Notes App</Text>
            <View style={styles.firstLineStyle}/>
            <View style={styles.subHeaderContainer}>
                <Image source={require('../assets/images/note.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Note</Text>
            </View>
            <View style={styles.subHeaderContainer}>
                <Image source={require('../assets/images/reminder.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Reminder</Text>
            </View>
            <View style={styles.subHeaderContainer}>
                <Image source={require('../assets/images/bin.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Bin</Text>
            </View>
            <View style={styles.subHeaderContainer}>
                <Image source={require('../assets/images/log_out.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Log Out</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.colorPrimaryVariant,
        alignSelf: 'center',
        marginTop: 25
    },
    title: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10,
        color: Colors.black
    },
    userName: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'center',
        color: Colors.grey
    },
    subHeaderTextStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.black,
        alignSelf: 'center',
        marginStart: 10,
    },
    subHeaderContainer: {
        flexDirection: 'row', 
        marginVertical: 10, 
        marginHorizontal: 20
    },
    iconStyle: {
        height: 20, 
        width: 20, 
        alignSelf: 'center'
    },
    firstLineStyle: {
        width: '100%', 
        height: 1, 
        backgroundColor: Colors.deep_grey, 
        marginTop: 10, 
        marginBottom: 10
    }
})

export default CustomDrawerContent;