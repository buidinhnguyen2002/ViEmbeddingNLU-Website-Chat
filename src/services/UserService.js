import {ApiConstants} from "../utils/Constants";

export const signup = async (password, email) => {
    try {
        const res = await fetch(ApiConstants.signup, {
            method: "POST",
            headers: {
                // authorization: `${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "password": password,
                "email": email,
            },)
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        // console.log(error);
        throw error;
    }
}
export const login = async (userName, password) => {
    try {
        const res = await fetch(ApiConstants.login, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: userName,
                password: password,
                scope: '',
                client_id: 'string',
                client_secret: 'string'
            })
        });
        const data = await res.json();
        data.status = res.status;
        if(res.status == 403){
            return data;
        }
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data
        }
    }catch (error) {
        throw error;
    }
}
export const resendVerifyToken = async (email) => {
    try {
        const res = await fetch(ApiConstants.resendVerifyToken, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email
            },)
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(`${data.detail[0].msg}`);
        }else{
            return data;
        }
    }catch (error) {
        // console.log(error);
        throw error;
    }
}
export const verifyAccount = async (email, token) => {
    try {
        const res = await fetch(`${ApiConstants.verifyToken}?email=${email}&token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
export const logout = async (authToken) => {
    console.log(authToken)
    try {
        const res = await fetch(`${ApiConstants.logout}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${authToken}`,
            },
        });
        const data = await res.json();
        console.log("ALO", data)
        if(!res.ok){
            throw new Error(`${data.detail}`);
        }else{
            return data;
        }
    }catch (error) {
        throw error;
    }
}
export const getUserInfo = async (accessToken) => {
    console.log(accessToken);
    try {
        const res = await fetch(ApiConstants.getUserInfo, {
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
export const getBots = async (accessToken) => {
    try {
        const res = await fetch(ApiConstants.getBots, {
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

export const refreshToken = async () => {
    // try {
    //     const res = await fetch(ApiConstants.getBots, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data = await res.json();
    //     if(!res.ok){
    //         throw new Error(`${data.detail}`);
    //     }else{
    //         return data;
    //     }
    // }catch (error) {
    //     throw error;
    // }
}
