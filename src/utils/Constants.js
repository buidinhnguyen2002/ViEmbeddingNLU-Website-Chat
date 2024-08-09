const API_BASE_URL = 'http://localhost:8068';
// const API_BASE_URL = 'http://3.106.221.190:8068';
export const ApiConstants = {
    signup: `${API_BASE_URL}/guest/signup`,
    login: `${API_BASE_URL}/guest/login`,
    refreshToken: `${API_BASE_URL}/guest/refresh-token`,
    resendVerifyToken: `${API_BASE_URL}/guest/resend-verify-token`,
    verifyForgotPass: `${API_BASE_URL}/guest/verify-forgot-pass`,
    acceptForgotPass: `${API_BASE_URL}/guest/accept-forgot-pass`,
    forgotPass: `${API_BASE_URL}/guest/forgot-pass`,
    verifyToken: `${API_BASE_URL}/guest/verify-token`,
    logout: `${API_BASE_URL}/api/v1/auth/logout`,
    getUserInfo: `${API_BASE_URL}/api/v1/users/me`,
    getBots: `${API_BASE_URL}/api/v1/users/bots`,
    getKnowledge: `${API_BASE_URL}/api/v1/users/knowledges`,
    bots: `${API_BASE_URL}/api/v1/bots`,
    knowledges: `${API_BASE_URL}/api/v1/knowledges`,
    chatsBot: `${API_BASE_URL}/api/v1/chats-bot`,
};

export const Routers = {
    Login: "/login",
    VerifyAccount: "/verify-account",
    Home: "/",
    MyInfo: "/myInfo",
}