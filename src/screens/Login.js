import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from "react-native";
import Colors from '../styles/colors';
import { LoginRegisterGradient, LoginRegTextInputGradient } from "../styles/GradientStyle";
import CheckBox from "../components/CheckBox";
import { useState } from "react";
import { loginApi } from "../api/userApi";
import { useNavigation } from "@react-navigation/native";
import { setCredentials } from "../utility/Storage";


function Login() {
    const navigation = useNavigation();

    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPassVisible, setPassVisible] = useState(false);

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
                await setCredentials(response?.data._id, response?.data.userId);
                navigation.navigate('Home');
                // Alert.alert("Success", response?.msg);
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
            <Text style={styles.signUpText}>Don't have account?</Text>
            <TouchableOpacity style={styles.signUpTouch} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signUpBtn}>Sign up</Text>
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
    signUpContainer: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        justifyContent: 'center', 
        marginTop: 20
    },
    signUpBtn: {
        color: Colors.colorOnPrimary, 
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        marginStart: 5, 
        fontSize: 14, 
        textDecorationLine: 'underline',
        verticalAlign: 'auto'
    },
    signUpText: {
        color: Colors.grey,
        fontFamily: 'sans-sarif',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
        alignSelf: 'center',
        verticalAlign: 'auto'
    },
    signUpTouch: {
        alignContent: 'center'
    }
})

export default Login;