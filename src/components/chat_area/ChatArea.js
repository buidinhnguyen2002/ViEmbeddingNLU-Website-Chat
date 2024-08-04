import InputChat from "../input_chat/InputChat";
import "./ChatArea.scss";
import ChatMessageItem from "../chat_message_item/ChatMessageItem";
import {useEffect, useRef, useState} from "react";
import KnowledgeItem from "../knowledge_item/KnowledgeItem";
import knowledgeImage from "../../assets/images/dataset_text.png";
import IconButton from "../icon_button/icon_button";
import SelectedKnowledgeModal from "../selected_knowledge_modal/SelectedKnowledgeModal";

export default function ChatArea() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [prompt, setPrompt] = useState('');
    const textareaRef = useRef(null);
    const [showAddKnowledge, setShowAddKnowledge] = useState(false);
    useEffect(() => {
        if (textareaRef.current) {
            // textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [prompt]);
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
                <ChatMessageItem message={"This is message1This is message1This is message1This is message1This is message1This is message1This is message1"} mySelf={true}/>
                <ChatMessageItem message={"This is message2 This is message2 This is message2 This is message2 This is message2 This is message2 This is message2"} mySelf={false}/>
                <ChatMessageItem message={"This is message3"} mySelf={true}/>
                <ChatMessageItem message={"This is message 4"} mySelf={false}/>
                <ChatMessageItem message={"This is message3"} mySelf={true}/>
                <ChatMessageItem message={"This is message 4"} mySelf={false}/>
                <ChatMessageItem message={"This is message3"} mySelf={true}/>
                <ChatMessageItem message={"This is message 4"} mySelf={false}/>
                <ChatMessageItem message={"This is message3"} mySelf={true}/>
                <ChatMessageItem message={"This is message 4"} mySelf={false}/>

            </div>
            <InputChat/>
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
                        <div className="knowledge_item">
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">Example Knowledge 1</span>
                                <span className="knowledge_description">Example Knowledge 1</span>
                            </div>
                        </div>
                        <div className="knowledge_item">
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">Example Knowledge 1</span>
                                <span className="knowledge_description">Example Knowledge 1</span>
                            </div>
                        </div>
                        <div className="knowledge_item">
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">Example Knowledge 1</span>
                                <span className="knowledge_description">Example Knowledge 1</span>
                            </div>
                        </div>
                        <div className="knowledge_item">
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">Example Knowledge 1</span>
                                <span className="knowledge_description">Example Knowledge 1</span>
                            </div>
                        </div>
                        <div className="knowledge_item">
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">Example Knowledge 1</span>
                                <span className="knowledge_description">Example Knowledge 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
            {showAddKnowledge && <SelectedKnowledgeModal toggleShowModal={toggleShowAddKnowledge}/>}
        </>)
}