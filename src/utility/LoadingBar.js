import { ActivityIndicator, StyleSheet, View } from "react-native"
import Colors from "../styles/colors";


export const loading = () => {
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color={Colors.colorPrimary}/>
        </View>
    )
}



const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sallow_green
    }
});