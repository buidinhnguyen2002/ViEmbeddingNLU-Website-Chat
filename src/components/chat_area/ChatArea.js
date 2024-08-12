import InputChat from "../input_chat/InputChat";
import "./ChatArea.scss";
import ChatMessageItem from "../chat_message_item/ChatMessageItem";
import {useEffect, useRef, useState} from "react";
import KnowledgeItem from "../knowledge_item/KnowledgeItem";
import knowledgeImage from "../../assets/images/dataset_text.png";
import IconButton from "../icon_button/icon_button";
import SelectedKnowledgeModal from "../selected_knowledge_modal/SelectedKnowledgeModal";
import {deleteBot} from "../../services/BotsService";
import {actionDeleteBot} from "../../store/actions/BotsAction";
import {createQueryBot, getChatsInBot, getKnowledgeInBot} from "../../services/ChatBotService";
import {useParams} from "react-router-dom";
import {decryptToken} from "../../utils/Functions";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import { v4 as uuidv4 } from 'uuid';
import avatarBot from "../../assets/images/bot.png";
import Loading from "../loading/Loading";


export default function ChatArea({chats}) {
    const { botId, chatId } = useParams();
    const [showSideBar, setShowSideBar] = useState(false);
    const [prompt, setPrompt] = useState('');
    const textareaRef = useRef(null);
    const [showAddKnowledge, setShowAddKnowledge] = useState(false);
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    const [knowledges, setKnowledges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const urlServer = `ws://localhost:8068/ws/bots/${botId}/chats/${chatId}/generate_stream`;
    const clientRef = useRef(null);
    const [chatsRender, setChatsRender] = useState([]);
    const [isProcess, setIsProcess] = useState(false);
    const [isDone, setIsDone] = useState(true);
    const scrollTargetRef = useRef(null);
    const [displayedText, setDisplayedText] = useState('');
    const [tempText, setTempText] = useState("");
    useEffect(() => {
        fetchKnowledgeInBot();
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({behavior: 'smooth'});
        }
        console.log("CHATS", chats)
        const transformedChats = Array.from(chats).map(chat => ({
            query_id: chat.query_id,
            content: chat.question.content,
            role: chat.question.role
        }));
        setChatsRender(transformedChats);
        if (textareaRef.current) {
            // textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [chats]);
    const displayTextCharacterByCharacter = (text) => {
        let index = -1;
        setDisplayedText("");
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setIsDone(true);
            }
        }, 50);
    };
    // useEffect(() => {
    //     // console.log("Updated tempText:", tempText);
    //     displayTextCharacterByCharacter(tempText);
    // }, [tempText]);
    const callAPIGenerationText = (query) => {
        clientRef.current = new W3CWebSocket(urlServer);
        clientRef.current.onopen = () => {
            console.log('WebSocket connection opened');
            clientRef.current.send(JSON.stringify(query));
        };
        let fullText = "";
        clientRef.current.onmessage = (message) => {
            console.log("Message received:", message.data);
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer.finish_reason == 'error') {
                console.log("MMMMMMMMMMMMMMMMMM", fullText);
                displayTextCharacterByCharacter(fullText);
                setChatsRender((prevChatsRender) => {
                    if (prevChatsRender.length > 0) {
                        const updatedChats = [...prevChatsRender];
                        const chatBot = updatedChats[updatedChats.length - 1];
                        chatBot.content = fullText;
                        return [...prevChatsRender.slice(0, -1), chatBot];
                    } else {
                        console.error("No chats available to update.");
                    }
                    return prevChatsRender;
                });
                return;
            }
            fullText = dataFromServer.full_text
            // setTempText(dataFromServer.full_text);
            // setChatsRender((prevChatsRender) => {
            //     console.log("CHAT RENDERS", chatsRender);
            //     if (prevChatsRender.length > 0) {
            //         const updatedChats = [...prevChatsRender];
            //         const chatBot = updatedChats[updatedChats.length - 1];
            //         chatBot.content = dataFromServer.full_text;
            //         return [...prevChatsRender.slice(0, -1), chatBot];
            //     } else {
            //         console.error("No chats available to update.");
            //         return prevChatsRender;
            //     }
            // });
        };

        clientRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        clientRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    const fetchKnowledgeInBot = async () => {
        try {
            const data = await getKnowledgeInBot(accessToken, botId);
            setKnowledges(data.knowledges);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching chat:', error.message);
        }
    };
    const toggleShowAddKnowledge = () => {
        setShowAddKnowledge(!showAddKnowledge);
        if(showSideBar) toggleShowSidebar();
    }
    const handleChange = (e) => {
        setPrompt(e.target.value);
    };
    const toggleShowSidebar = () => {
        setShowSideBar(!showSideBar);
    }
    const handleSendMessage = async (message) => {
        if (!isDone) return;
        setIsDone(false);
        const newMessage = {
            query_id: uuidv4(),
            content: message,
            role: "user",
        };
        setChatsRender((prevChats) => [...prevChats, newMessage]);
        setIsProcess(true);
        const newChatBot = {
            query_id: uuidv4(),
            content: "",
            role: "bot",
        };
        setChatsRender((prevChats) => [...prevChats, newChatBot]);
        try {
            const data = await createQueryBot(botId, chatId, message, accessToken);
            callAPIGenerationText(data);
            setIsProcess(false);
        } catch (error) {
            console.error('Error creating bot:', error.message);
        }
    }
    const handleDeleteKnowledge = (id) => {
        const newKnowledge = knowledges.filter(knowledge => knowledge.knowledge_id != id);
        setKnowledges(newKnowledge);
    }
    return(
        <>
        <div className={"chat_area"}>
            <div className="chat_area__title">
                <span>Chat Interface</span>
                <div onClick={toggleShowSidebar} className="side_bar_ic">
                    <i className="bi bi-layout-sidebar-reverse"></i>
                </div>
            </div>
            <div className="chat_area__message">
                {Array.from(chatsRender).map((chat, index)=> {
                    return <ChatMessageItem ref={chatsRender.length - 1 === index ? scrollTargetRef : null}  key={chat.query_id} message={!isDone && index == (chatsRender.length - 1) && chat.role!="user" ? displayedText : chat.content} mySelf={chat.role=="user"} isProcess={isProcess}/>
                })}
            </div>
            <InputChat sendMessage={handleSendMessage}/>
            <div className={`side_bar__container ${showSideBar ? "side_bar__container--show":""} `}>
                <div className="side_bar_item__container">
                    <span className="side_bar_item__title">Persona & Prompt</span>
                    <div className={"input_prompt"}><textarea ref={textareaRef} placeholder={"Design the bot's persona"} value={prompt} onChange={handleChange}
                                                              rows={1}/></div>
                </div>
                <div className="side_bar_item__container side_bar_item__container--max">
                    <div className="side_bar_item__header">
                        <span className="side_bar_item__title">Knowledge</span>
                        <div onClick={toggleShowAddKnowledge} title={"Add knowledge"} className="ic_add">
                            <i className="bi bi-plus"></i>
                        </div>
                    </div>
                    <div className="knowledge__container">
                        {Array.from(knowledges).map((knowledge, index)=> {
                                return <div key={knowledge.knowledge_id} className="knowledge_item">
                                    <div className="knowledge_img">
                                        <img src={knowledgeImage} alt=""/>
                                    </div>
                                    <div className="knowledge__content">
                                        <span className="knowledge_title">{knowledge.name}</span>
                                        <span className="knowledge_description">{knowledge.description}</span>
                                    </div>
                                </div>
                        })}
                    </div>
                </div>
            </div>
    </div>
            {showAddKnowledge && <SelectedKnowledgeModal botId={botId} deleteKnowledge={handleDeleteKnowledge} addKnowledge={setKnowledges} knowledges={knowledges} toggleShowModal={toggleShowAddKnowledge}/>}
        </>)
}