import axios from "axios";
import { TOKEN_KEY, BASE_URL } from '@env';
import apiClient from "../utility/ApiClient";

const url = BASE_URL;
const authToken = TOKEN_KEY;

export const getAllNotes = async (databaseUserId, userId) => {
    try {
        const response = await apiClient.post('/note/getAllNotes', {databaseUserId, userId});
        return response.data;
    } catch (error) {
        console.error("getAllNoteErrRes ==>", error);
        return error;
    }
};

export const createNote = async (title, note, databaseUserId, userId, reminderDateTime) => {
    try {
        console.log(`title: ${title}, note: ${note}, dbUsId: ${databaseUserId}, userId: ${userId}, rmDt: ${reminderDateTime}`);
        const response = await apiClient.post('/note/createNote', {title, note, databaseUserId, userId, reminderDateTime});
        console.log("createNoteRes ==>", response);
        return response.data;
    } catch (error) {
        console.error("createNoteErr ==>", error);
        return response.error;
    }
};

export const deleteNote = async (noteDatabaseId, noteId, databaseUserId, userId) => {
    try {
        const response = await axios.delete(`${url}/note/deleteNote`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            data: {
                noteDatabaseId,
                noteId,
                databaseUserId,
                userId
            }
        });
    return response.data;
    } catch (error) {
        console.log("Error deleting note: ", error.message);
        throw error;
    }
};