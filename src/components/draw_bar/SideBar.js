import './SideBar.scss'
import TextButtonIcon from "../icon_text_button/TextButtonIcon";
import SideBarItem from "../draw_bar_item/SideBarItem";
import './SideBar.scss';
import {useState} from "react";
import InputModal from "../input_modal/InputModal";
import TextAreaModal from "../textarea_modal/TextAreaModal";
import BotModal from "../bot_modal/BotModal";
import {ReactComponent as BotIcon} from "../../assets/svg/bot.svg";
export default function SideBar(props) {
    const [createBotModal, setCreateBotModal] = useState(false);
    const [titleBot, setTitleBot] = useState("");
    const [descriptionBot, setDescriptionBot] = useState("");
    const [index, setIndex] = useState('0');
    const toggleCreateBotModel = () => {
        setCreateBotModal(!createBotModal);
    }
    const confirm = (titleBot, descriptionBot) => {
        console.log(descriptionBot);
    }
    return(
        <div className={"drawbar"}>
            <div className={"drawbar__header"}>
                {/*<TextButtonIcon icon={<i className="bi bi-plus-lg"></i>} title={"Create bot"} onPress={toggleCreateBotModel}/>*/}
                <SideBarItem icon={<BotIcon/>} title={"My bots"} url={"/bots"} index={1} selectedIndex={index} handleSelect={setIndex}/>
                <SideBarItem icon={<i className="bi bi-journal-text"></i>} title={"My knowledge"} url={"/knowledge"} index={2} selectedIndex={index} handleSelect={setIndex}/>
            </div>
            <div className={"drawbar__bottom"}>
                <SideBarItem icon={<i className="bi bi-person"></i>} title={"My account"}/>
                <SideBarItem icon={<i className="bi bi-box-arrow-up-right"></i>} title={"Update & FAG"}/>
                <SideBarItem icon={<i className="bi bi-box-arrow-right"></i>} title={"Log out"}/>
            </div>
            {
                createBotModal && <BotModal toggleCreateBotModel={toggleCreateBotModel} confirm={confirm}/>
            }
        </div>
    )
}