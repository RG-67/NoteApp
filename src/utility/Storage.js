import EncryptedStorage from "react-native-encrypted-storage";



export async function setCredentials(dbUserId, userId) {
    try {
        await EncryptedStorage.setItem("user_credentials", JSON.stringify({dbUserId, userId}));
        console.log("Creds ==>", `dbId: ${dbUserId}, usId: ${userId}`);
        console.log("Credentials saved!");
    } catch (error) {
        console.log("Failed to saved credentials", error);
    }
}

export async function getCredentials() {
    try {
        const credentials = await EncryptedStorage.getItem("user_credentials");
        return credentials ? JSON.parse(credentials) : null;
    } catch (error) {
        console.error("Failed to get credentials", error);
        return null;
    }
}

export async function removeCredentials() {
    try {
        await EncryptedStorage.clear();
        console.log("Credentials clear");
    } catch (error) {
        console.error("Failed to clear credentials", error);
    }
}