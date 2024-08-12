import "./ChatSideBar.scss";
import ChatSideBarItem from "../chat_side_bar_item/ChatSideBarItem";
import {useState} from "react";
import {createBot, updateBot} from "../../services/BotsService";
import {actionUpdateBot, addBot} from "../../store/actions/BotsAction";
import {createChatBot} from "../../services/ChatBotService";
import {decryptToken} from "../../utils/Functions";
import {addChat} from "../../store/actions/ChatAction";
import {useDispatch, useSelector} from "react-redux";
import BotItem from "../bot_item/BotItem";
export default function ChatSideBar({botId}) {
    const [index, setIndex] = useState(-1);
    const [newChat, setNewChat] = useState("");
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    const dispatch = useDispatch();
    const chatsBot = useSelector((state) => state.chatsBotReducer.chats);
    const chats = chatsBot ? chatsBot.chats :[];
    const handleCreateNewChat = async () =>{
        try {
            const data = await createChatBot(newChat,accessToken, botId);
            console.log(data)
            dispatch(addChat(data));
        } catch (error) {
            console.error('Error create bot:', error.message);
        }
    }
    return (
        <div className={"drawbar drawbar--padding"}>
            <div className="chat__wrapper">
                <div className="new_chat">
                    <input type="text" value={newChat} onChange={(e)=>setNewChat(e.target.value)} className={"new_chat__input"} placeholder={"New chat"}/>
                    <div onClick={handleCreateNewChat} className="btn_create_chat"><span>Create</span></div>
                </div>
                {chats.map((chatBot, i)=>{
                    return <ChatSideBarItem key={chatBot.chat_id} title={chatBot.title} botId={botId} chatId={chatBot.chat_id} index={i} selectedIndex={index} handleSelected={setIndex}/>
                })}
            </div>
            <div className="btn_return_home">
                <span></span>
            </div>
        </div>
    )
}