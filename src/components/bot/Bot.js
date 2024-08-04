import botsIcon from "../../assets/images/bot.png"
import "./Bot.scss"
import BotItem from "../bot_item/BotItem";
import {useState} from "react";
import BotModal from "../bot_modal/BotModal";
export default function Bot() {
    const [editBotModal, setEditBotModal] = useState(false);
    const [titleBot, setTitleBot] = useState("");
    const [descriptionBot, setDescriptionBot] = useState("");
    const toggleEditBotModel = (titleBot="", descriptionBot="") => {
        // if(!editBotModal){
        //     setTitleBot(titleBot);
        //     setDescriptionBot(descriptionBot);
        // }
        setTitleBot(titleBot);
        setDescriptionBot(descriptionBot);
        setEditBotModal(!editBotModal);
    }
    const confirm = (titleBot, descriptionBot) => {
        console.log(descriptionBot);
    }
    return (
        <div className={"bot_page"}>
            <div className="bot_page__header">
                <div className="bot_page__title">
                    <img src={botsIcon} alt=""/><p className={"title"}>Bots</p>
                </div>
                <div className="bot_page__btn">
                    <div onClick={()=>toggleEditBotModel()} className={"btn_create_bot"}>
                        <p className={"btn_create_bot--text"}>Create bot</p>
                    </div>
                </div>
            </div>
            <div className="bot_page__body">
                <BotItem title={"This is titleThis is titleThis is titleThis is titleThis is titleThis is titleThis is titleThis is title"} description={"This is description bots"} createAt={"25-07-2024"} toggleEditBot={toggleEditBotModel}/>
                <BotItem toggleEditBot={toggleEditBotModel} title={"This is title"} description={"This is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description botsThis is description bots"} createAt={"25-07-2024"}/>
                <BotItem toggleEditBot={toggleEditBotModel} title={"This is title"} description={"This is description bots"} createAt={"25-07-2024"}/>
                <BotItem toggleEditBot={toggleEditBotModel} title={"This is title"} description={"This is description bots"} createAt={"25-07-2024"}/>
            </div>
            {editBotModal && <BotModal title={titleBot} description={descriptionBot} toggleCreateBotModel={toggleEditBotModel}/>}
        </div>
    )
}