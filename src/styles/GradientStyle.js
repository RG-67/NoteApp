import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";



export function LoginRegisterGradient ({children}) {
    return (
        <LinearGradient
        colors={['#D9F4DA', '#E2F6E4', '#D9F4DA']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientBackground}>
        {children}
        </LinearGradient>
    )
}

export function LoginRegTextInputGradient({children}) {
    return (
        <LinearGradient
        colors={['#60BF7B', '#70CD8A', '#8AECA4']}
        start={{x: 5, y: 5}}
        end={{x: 5, y: 5}}
        locations={[0.1, 0.75, 1]}
        style={styles.textInputGradient}>
        {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    textInputGradient: {
        borderRadius: 10,
        marginHorizontal: 40,
        height: 40,
        marginBottom: 10
    }
})