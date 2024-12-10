import { ToastAndroid } from "react-native"


export const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

export const mergedDateTime = (date, time) => {
    const [hours, minutes, seconds] = time.match(/(\d+):(\d+):(\d+)\s(AM|PM)/).slice(1, 5);
    const isPM = time.includes("PM");
    const adjustHourss = isPM ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12;
    const mergedDate = new Date(date);

    mergedDate.setHours(adjustHourss, parseInt(minutes), parseInt(seconds), 0);
    return mergedDate.toISOString();
}

export const formattedDate = (inputDate) => {
    const [day, month, year] = inputDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth()+1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    console.log("formatted Date -->", `${formattedYear}-${formattedMonth}-${formattedDay}`);
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}