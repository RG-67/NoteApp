import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';


const CheckBox = (props) => {
    const iconName = props.isChecked?  "checkbox-marked" : "checkbox-blank-outline"
    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <Icon name={iconName} size={20} color={Colors.icon_tint}/>
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: 150,
        marginTop: 5,
        marginHorizontal: 5
    },
    title: {
        marginLeft: 5,
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.deep_grey,
        fontFamily: 'sans-sarif',
        alignSelf: 'center'
    },
})


export default CheckBox;