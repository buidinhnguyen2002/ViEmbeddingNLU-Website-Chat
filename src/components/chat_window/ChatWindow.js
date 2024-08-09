import ChatArea from "../chat_area/ChatArea";
import DocumentViewer from "../document_viewer/DocumentViewer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBots} from "../../services/UserService";
import {saveBots} from "../../store/actions/BotsAction";
import {useDispatch} from "react-redux";
import {decryptToken} from "../../utils/Functions";
import Loading from "../loading/Loading";
import {getChatsInBot} from "../../services/ChatBotService";
import {actionSaveCurrentChatInBot} from "../../store/actions/ChatAction";

export default function ChatWindow() {
    const { botId, chatId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    useEffect(() => {
        fetchData();
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
    return (
        <>
            {isLoading? <Loading/> : <>
                <ChatArea/>
                <DocumentViewer/>
            </>}

        </>
    )
}