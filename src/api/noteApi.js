import axios from "axios";
import { TOKEN_KEY, BASE_URL } from '@env';

const url = BASE_URL;
const authToken = TOKEN_KEY;

export const getAllNotes = async (databaseUserId, userId) => {
    // console.log("Loaded Token Key: ", TOKEN_KEY);
    try {
        const response = await axios.post(`${url}/note/getAllNotes`, {
            databaseUserId,
            userId
        },
    {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    );
    return response.data;
    } catch (error) {
        console.log("Error fetching notes: ", error.message);
        throw error;
    }
};

export const createNote = async (title, note, databaseUserId, userId, reminderDateTime) => {
    try {
        const response = await axios.post(`${url}/note/createNote`, {
            title, note, databaseUserId, userId, reminderDateTime
        },
    {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    );
    return response.data;
    } catch (error) {
        console.log("Error creating note: ", error.message);
        throw error;
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