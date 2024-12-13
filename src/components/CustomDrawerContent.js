import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";
import { CommonActions } from "@react-navigation/native";
import { removeCredentials } from "../utility/Storage";

const CustomDrawerContent = ({onLogOut, state, ...props}) => {
    const activeRouteName = state.routes[state.index].name;

    
    const showAlertDialog = () => {
        Alert.alert("Alert!",
            "Are you sure want to log out?",
            [
                {
                    text: "Cancle",
                    onPress: () => console.log("Cancel button pressed.."),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => onLogOut(),
                    style: "destructive"
                }
            ],
            {cancelable: false}
        );
    }


    return (
        <View>
            <Image source={require('../assets/images/avatar.png')} style={styles.imageStyle}/>
            <Text style={styles.title}>Notes App</Text>
            <Text style={styles.userName}>Notes App</Text>
            <View style={styles.firstLineStyle}/>
            <TouchableOpacity style={[styles.subHeaderContainer, activeRouteName === 'Note' && styles.activeDrawerStyle]} onPress={() => props.navigation.navigate('Note')}>
                <Image source={require('../assets/images/note.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subHeaderContainer, activeRouteName === 'Reminder' && styles.activeDrawerStyle]} onPress={() => props.navigation.navigate('Reminder')}>
                <Image source={require('../assets/images/reminder.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subHeaderContainer, activeRouteName === 'Bin' && styles.activeDrawerStyle]} onPress={() => props.navigation.navigate('Bin')}>
                <Image source={require('../assets/images/bin.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Bin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subHeaderContainer} onPress={() => showAlertDialog()}>
                <Image source={require('../assets/images/log_out.png')} style={styles.iconStyle}/>
                <Text style={styles.subHeaderTextStyle}>Log Out</Text>
            </TouchableOpacity>
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
        marginHorizontal: 20,
        padding: 10
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
    },
    activeDrawerStyle: {
        backgroundColor: Colors.transparent_green,
        elevation: 2
    }
})

export default CustomDrawerContent;