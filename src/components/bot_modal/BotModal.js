import InputModal from "../input_modal/InputModal";
import TextAreaModal from "../textarea_modal/TextAreaModal";
import TextButtonIcon from "../icon_text_button/TextButtonIcon";
import {useEffect, useState} from "react";
import "./BotModal.scss"

export default function BotModal({botId,toggleCreateBotModel, confirm, title, description}) {
    const [titleBot, setTitleBot] = useState("");
    const [descriptionBot, setDescriptionBot] = useState("");
    useEffect(() => {
        if (title) {
            setTitleBot(title);
        }
        if (description) {
            setDescriptionBot(description);
        }
    }, [title, description]);
    return (
        <div className="overlay">
            <div className="new_bot__modal ">
                <h2 className="title_form">{botId ? "Edit bot":"Create bot"} </h2>
                <form className={"new_bot__modal-body"}>
                    <InputModal currentLength={titleBot.length} value={titleBot} onChangeInput={setTitleBot} label={"Bot name"} placeHolder={"Give the bot a unique name"} maxLength={40}/>
                    <TextAreaModal value={descriptionBot} currentLength={descriptionBot.length} onChangeInput={setDescriptionBot} label={"Bot function description"} placeHolder={"It introduces the bot functions and is displayed to the bot users"} maxLength={350}/>
                </form>
                <div className="new_bot__modal-footer">
                    <TextButtonIcon title={"Cancel"} onPress={toggleCreateBotModel} background={"#FFFFFF"} color={"#1C1C1C"}/>
                    <TextButtonIcon title={"Confirm"} onPress={()=>confirm(titleBot, descriptionBot, botId)}/>
                </div>
            </div>
        </div>
    )
}