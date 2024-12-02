import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { LoginRegisterGradient, LoginRegTextInputGradient } from "../styles/GradientStyle";
import Colors from "../styles/colors";
import { useState } from "react";



function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPassVisible, setPassVisible] = useState(false);

    return (
        <LoginRegisterGradient>
        <View>
        <ScrollView>
        <Text style={styles.headerTextStyle}>Register</Text>
        <Text style={styles.subHeaderTextStyle}>Create your account</Text>
        <LoginRegTextInputGradient>
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/images/email.png')} style={styles.iconStyle}/>
                <TextInput placeholder="Email" 
                multiline={false} 
                numberOfLines={1}  
                keyboardType="email-address"
                style={styles.textInputStyle}
                value={email}
                onChangeText={setEmail}/>
                </View>
            </LoginRegTextInputGradient>
            <LoginRegTextInputGradient>
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/images/password.png')} style={styles.iconStyle}/>
                <TextInput 
                placeholder="Password"  
                secureTextEntry={!isPassVisible}
                style={styles.textInputStyle}
                value={password}
                onChangeText={setPassword}/>
                <TouchableOpacity onPress={() => setPassVisible(!isPassVisible)}>
                    <Image 
                    source={isPassVisible ? require('../assets/images/open_eye.png') : require('../assets/images/close_eye.png')}
                    style={styles.passImageStyle}/>
                </TouchableOpacity>
                </View>
            </LoginRegTextInputGradient>
        </ScrollView>
        </View>
        </LoginRegisterGradient>
    )
}


const styles = StyleSheet.create({
    headerTextStyle: {
        color: Colors.colorOnPrimary,
        fontSize: 18,
        fontFamily: 'sans-sarif',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    subHeaderTextStyle: {
        color: Colors.grey,
        fontFamily: 'sans-sarif',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 15
    },
    iconStyle: {
        height: 20,
        width: 20,
        marginStart: 10,
        marginEnd: 5,
        alignSelf: 'center',
        tintColor: Colors.icon_tint
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInputStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.icon_tint,
        marginEnd: 10,
        fontFamily: 'sans-sarif',
    },
    passImageStyle: {
        height: 20,
        width: 20,
        marginEnd: 10,
        alignSelf: 'center',
        tintColor: Colors.icon_tint
    },
})



export default Registration;