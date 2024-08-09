import {ApiConstants} from "../utils/Constants";
import {json} from "react-router-dom";

export const getChatsBot = async (accessToken, botId) => {
    try {
        const res = await fetch(`${ApiConstants.chatsBot}/${botId}/chats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}
export const getChatsInBot = async (accessToken, botId, chatId) => {
    try {
        const res = await fetch(`${ApiConstants.chatsBot}/${botId}/chats/${chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}
export const createChatBot = async (title, authToken, botId) => {
    try {
        const res = await fetch(`${ApiConstants.chatsBot}/${botId}/chats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                "title": title,
            })
        });
        const data = await res.json();
        console.log(data);
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}
export const updateChatBot = async (title, authToken, botId, chatId) => {
    try {
        const res = await fetch(`${ApiConstants.chatsBot}/${botId}/chats/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                "title": title,
            })
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}
export const deleteChatBot = async (authToken, botId, chatId) => {
    try {
        const res = await fetch(`${ApiConstants.chatsBot}/${botId}/chats/${chatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${authToken}`,
            },
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}

