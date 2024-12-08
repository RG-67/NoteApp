import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/colors";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";



function TestScreen() {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showPicker = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange : (event, selectedDate) => {
                if(selectedDate) {
                    if(currentMode === 'date') {
                        setDate(selectedDate);
                        showPicker('time')
                        console.log("Selected date ==>", selectedDate.toLocaleDateString());
                    } else if(currentMode === 'time') {
                        console.log("Selected time ==>", selectedDate.toLocaleTimeString());
                    }
                }
                // const currentDate = selectedDate || date;
                // setShow(Platform.OS === 'android');
            },
            mode: currentMode,
            is24Hour: true
        });
        // setShow(true);
        // setMode(currentMode);
    };

    return(
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center', alignContent: 'center'}}>
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor: Colors.colorOnPrimary, borderRadius: 20, justifyContent: 'center'}}
            onPress={() => showPicker('date')}>
                <Text style={{fontSize: 15, color: Colors.white, fontWeight: 'bold', alignSelf: 'center'}}>Click</Text>
            </TouchableOpacity>
        {/*     {show && (
        <DateTimePickerAndroid
          value={date}
          mode={mode}
          display="default" // 'default', 'spinner', 'calendar', 'clock'
          onChange={onChange}
        />
      )} */}
        </View>
    )
}





export default TestScreen;