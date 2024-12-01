import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from "react-native";
import Colors from '../styles/colors';
import { LoginRegisterGradient, LoginRegTextInputGradient } from "../styles/GradientStyle";
import CheckBox from "../components/CheckBox";
import { useState } from "react";
import { loginApi } from "../api/userApi";





function Login() {
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUser = () => {
        if(!email) {
            showToast("Enter email id");
        } else if(!password) {
            showToast("Enter password");
        } else {
            setLogin();
        }
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const setLogin = async () => {
        try {
            const response = await loginApi(email, password);
            if (response?.status === true) {
                setEmail("");
                setPassword("");
                Alert.alert("Success", response?.msg);
            } else {
                Alert.alert("Error", response?.msg || "Invalid user id or password");
            }
        } catch (error) {
            console.error("Error in loging", error.message);
        }
    }

    return (
        <LoginRegisterGradient>
        <View>
            <Text style={styles.headerTextStyle}>Welcome Back</Text>
            <Text style={styles.subHeaderTextStyle}>Login to your account</Text>
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
                // secureTextEntry={true} 
                style={styles.textInputStyle}
                value={password}
                onChangeText={setPassword}/>
                <TouchableOpacity>
                    <Image source={require('../assets/images/open_eye.png')} style={styles.passImageStyle}/>
                </TouchableOpacity>
                </View>
            </LoginRegTextInputGradient>
            <View style={styles.rememberForgotContainer}>
                <CheckBox
                onPress={() => setRemember(!remember)}
                title="Remember Me"
                isChecked={remember}/>
                <TouchableOpacity>
                    <Text style={styles.forgotPass}>Forgot Password ?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleUser}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
            <Text style={styles.subHeaderTextStyle}>Don't have account?</Text>
            <TouchableOpacity>
            <Text style={styles.signUp}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </View>
        </LoginRegisterGradient>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.transparent_green,
        flex: 1
    },
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
    textInputStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.icon_tint,
        marginEnd: 10,
        fontFamily: 'sans-sarif',
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
    passImageStyle: {
        height: 20,
        width: 20,
        marginEnd: 10,
        alignSelf: 'center',
        tintColor: Colors.icon_tint
    },
    forgotPass: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.icon_tint,
        fontFamily: 'sans-sarif',
        alignSelf: 'center'
    },
    loginBtn: {
        height: 45,
        borderRadius: 50,
        backgroundColor: Colors.colorOnPrimary,
        marginHorizontal: 40,
        marginTop: 50,
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-sarif',
        alignSelf: 'center',
        color: Colors.white
    },
    rememberForgotContainer: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    signUp: {
        color: Colors.colorOnPrimary, 
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        marginStart: 5, 
        fontSize: 15, 
        textDecorationLine: 'underline'
    },
    signUpContainer: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        justifyContent: 'center', 
        marginTop: 20
    }
})

export default Login;