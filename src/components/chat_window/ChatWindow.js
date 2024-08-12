import ChatArea from "../chat_area/ChatArea";
import DocumentViewer from "../document_viewer/DocumentViewer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBots} from "../../services/UserService";
import {saveBots} from "../../store/actions/BotsAction";
import {useDispatch, useSelector} from "react-redux";
import {decryptToken} from "../../utils/Functions";
import Loading from "../loading/Loading";
import {getChatsInBot, getKnowledgeInBot} from "../../services/ChatBotService";
import {actionSaveCurrentChatInBot} from "../../store/actions/ChatAction";
import {getKnowledges} from "../../services/KnowledgeService";

export default function ChatWindow() {
    const { botId, chatId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    // const myknowledges = useSelector((state) => state.knowledgeReducer.knowledges);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        fetchData();
        fetchChatInBot();
    }, [chatId,accessToken]);
    const fetchData = async () => {
        try {
            const data = await getChatsInBot(accessToken, botId, chatId);
            dispatch(actionSaveCurrentChatInBot(data));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching chat:', error.message);
        }
    };
    const fetchChatInBot = async () => {
        try {
            const data = await getChatsInBot(accessToken, botId, chatId);
            // console.log("DATA CHAT IN BOT", data.queries);
            setChats(data.queries);
            // setIsLoading(false);
        } catch (error) {
            console.error('Error fetching chat:', error.message);
        }
    };
    return (
        <>
            {isLoading? <Loading/> : <>
                <ChatArea chats={chats}/>
                <DocumentViewer chats={chats}/>
            </>}

        </>
    )
}