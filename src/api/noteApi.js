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
        const response = await apiClient.post('/note/createNote', {title, note, databaseUserId, userId, reminderDateTime});
        return response.data;
    } catch (error) {
        console.error("createNoteErr ==>", error);
        return response.error;
    }
};

export const getReminderNotes = async (databaseUserId, userId) => {
    try {
        const response = await apiClient.post('/note/getReminderNote', {databaseUserId, userId});
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        console.error("getReminderNoteErr ==>", errorResponse);
        return errorResponse;
    }
}

export const getBinNotes = async (databaseUserId, userId) => {
    try {
        const response = await apiClient.post('/note/getBinNote', {databaseUserId, userId});
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        return errorResponse;
    }
}

export const updateNote = async (noteDatabaseId, noteId, title, note, databaseUserId, userId) => {
    try {
        const response = await apiClient.patch('/note/updateNote', {noteDatabaseId, noteId, title, note, databaseUserId, userId});
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        return errorResponse;
    }
}

export const setBinNote = async (noteDatabaseId, noteId, databaseUserId, userId) => {
    try {
        const response = await apiClient.patch('/note/setBinNote', {noteDatabaseId, noteId, databaseUserId, userId});
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        return errorResponse;
    }
}

export const restoreNote = async (noteDatabaseId, noteId, databaseUserId, userId) => {
    try {
        const response = await apiClient.patch('/note/restoreNote', {noteDatabaseId, noteId, databaseUserId, userId});
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        return errorResponse;
    }
}

export const deleteNote = async (noteDatabaseId, noteId, databaseUserId, userId) => {
    try {
        const response = await apiClient.delete('/note/deleteNote', {
            data: {noteDatabaseId, noteId, databaseUserId, userId}
        });
        return response.data;
    } catch (error) {
        const errorResponse = error.response?.data || {};
        return errorResponse;
    }
}