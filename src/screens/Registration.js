import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import { LoginRegisterGradient, LoginRegTextInputGradient } from "../styles/GradientStyle";
import Colors from "../styles/colors";
import { useState } from "react";
import { registerApi } from "../api/userApi";
import { CommonActions, useNavigation } from "@react-navigation/native";



function Registration() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [isPassVisible, setPassVisible] = useState(false);
    const [isConPassVisible, setConPassVisible] = useState(false);

    const blankCheck = () => {
        if (name === "") {
            showToast("Enter name");
        } else if(number === "" || number.length != 10) {
            showToast("Enter valid number");
        } else if(email === "") {
            showToast("Enter email address");
        } else if(password === "") {
            showToast("Enter password");
        } else if(conPassword === "") {
            showToast("Enter confirm password");
        } else if(password !== conPassword) {
            showToast("Password does not match");
        } else {
            handleRegister();
        }
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleRegister = async () => {
        try {
            const response = await registerApi(name, number, email, conPassword);
            console.log("res", response);
            if (response?.status === true) {
                setName("");
                setNumber("");
                setEmail("");
                setPassword("");
                setConPassword("");
                Alert.alert("Successfull", response.msg);
            } else {
                Alert.alert("Invalid", response?.msg || "Registration failed");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <LoginRegisterGradient>
        <View>
        <ScrollView>
        <Text style={styles.headerTextStyle}>Register</Text>
        <Text style={styles.subHeaderTextStyle}>Create your account</Text>
        <LoginRegTextInputGradient>
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/images/user.png')} style={styles.iconStyle}/>
                <TextInput placeholder="Full Name"
                multiline={false} 
                numberOfLines={1}  
                keyboardType="default"
                style={styles.textInputStyle}
                value={name}
                onChangeText={setName}/>
                </View>
            </LoginRegTextInputGradient>
            <LoginRegTextInputGradient>
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/images/phone.png')} style={styles.iconStyle}/>
                <TextInput placeholder="Number" 
                multiline={false} 
                numberOfLines={1}  
                keyboardType="number-pad"
                maxLength={10}
                style={styles.textInputStyle}
                value={number}
                onChangeText={setNumber}/>
                </View>
            </LoginRegTextInputGradient>
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
            <LoginRegTextInputGradient>
                <View style={styles.inputContainer}>
                    <Image source={require('../assets/images/password.png')} style={styles.iconStyle}/>
                <TextInput 
                placeholder="Password"  
                secureTextEntry={!isConPassVisible}
                style={styles.textInputStyle}
                value={conPassword}
                onChangeText={setConPassword}/>
                <TouchableOpacity onPress={() => setConPassVisible(!isConPassVisible)}>
                    <Image 
                    source={isConPassVisible ? require('../assets/images/open_eye.png') : require('../assets/images/close_eye.png')}
                    style={styles.passImageStyle}/>
                </TouchableOpacity>
                </View>
            </LoginRegTextInputGradient>
            <TouchableOpacity style={styles.registerBtn} onPress={blankCheck}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.continueWithView}>
                <View style={styles.viewBar}/>
                <Text style={styles.continueWith}>Or Continue With</Text>
                <View style={styles.viewBar}/>
            </View>
            <View style={styles.otherSignUpOption}>
                <Image style={styles.otherOptionImgStyle} source={require('../assets/images/twitter.png')}/>
                <Image style={styles.otherOptionImgStyle} source={require('../assets/images/google.png')}/>
                <Image style={styles.otherOptionImgStyle} source={require('../assets/images/linkedin.png')}/>
            </View>
            <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity style={styles.signInBtnTextStyle} 
            onPress={() => navigation.dispatch(CommonActions.reset({index: 0, routes: [{name : 'Login'}]}))}>
            <Text style={styles.signInBtn}>Sign In</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
        </LoginRegisterGradient>
    )
}


const styles = StyleSheet.create({
    signInContainer: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        justifyContent: 'center', 
        marginTop: 20
    },
    signInText: {
        color: Colors.grey,
        fontFamily: 'sans-sarif',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
        alignSelf: 'center',
        verticalAlign: 'auto'
    },
    signInBtn: {
        color: Colors.colorOnPrimary, 
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        marginStart: 5, 
        fontSize: 14, 
        textDecorationLine: 'underline',
        verticalAlign: 'auto'
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
    registerBtn: {
        height: 45,
        borderRadius: 50,
        backgroundColor: Colors.colorOnPrimary,
        marginHorizontal: 40,
        marginVertical: 20,
        justifyContent: 'center'
    },
    registerText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-sarif',
        alignSelf: 'center',
        color: Colors.white
    },
    continueWithView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 15
    },
    viewBar: {
        width: 80, 
        backgroundColor: 
        Colors.deep_grey, 
        height: 1.5
    },
    continueWith: {
        color: Colors.deep_grey, 
        marginHorizontal: 10, 
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        fontSize: 13
    },
    otherSignUpOption: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        marginVertical: 10
    },
    otherOptionImgStyle: {
        height: 30, 
        width: 30
    },
    signInBtnTextStyle: {
        alignContent: 'center'
    }
})



export default Registration;