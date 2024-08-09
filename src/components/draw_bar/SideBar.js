import './SideBar.scss'
import TextButtonIcon from "../icon_text_button/TextButtonIcon";
import SideBarItem from "../draw_bar_item/SideBarItem";
import './SideBar.scss';
import {useState} from "react";
import InputModal from "../input_modal/InputModal";
import TextAreaModal from "../textarea_modal/TextAreaModal";
import BotModal from "../bot_modal/BotModal";
import {ReactComponent as BotIcon} from "../../assets/svg/bot.svg";
import {useSelector} from "react-redux";
import {logout} from "../../services/UserService";
import {Link, Router, useNavigate} from "react-router-dom";
import {Routers} from "../../utils/Constants";
import {decryptToken} from "../../utils/Functions";
export default function SideBar(props) {
    const [createBotModal, setCreateBotModal] = useState(false);
    const [titleBot, setTitleBot] = useState("");
    const [descriptionBot, setDescriptionBot] = useState("");
    const [index, setIndex] = useState('0');
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    const navigate = useNavigate();
    const toggleCreateBotModel = () => {
        setCreateBotModal(!createBotModal);
    }
    const confirm = (titleBot, descriptionBot) => {
        console.log(descriptionBot);
    }
    const handleLogout = async () => {
        await logout(accessToken).then(data => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate(Routers.Login);
        }).catch(error => {
            console.log(error.message);
            return;
        })
    }
    const navigateToMyInfo = () => {
        // navigate("myInfo");
        // console.log("DAY NEFFFFF")
    }
    return(
        <div className={"drawbar"}>
            <div className={"drawbar__header"}>
                {/*<TextButtonIcon icon={<i className="bi bi-plus-lg"></i>} title={"Create bot"} onPress={toggleCreateBotModel}/>*/}
                <SideBarItem icon={<BotIcon/>} title={"My bots"} url={"/bots"} index={1} selectedIndex={index} handleSelect={setIndex}/>
                <SideBarItem icon={<i className="bi bi-journal-text"></i>} title={"My knowledge"} url={"/knowledge"} index={2} selectedIndex={index} handleSelect={setIndex}/>
            </div>
            <div className={"drawbar__bottom"}>
                <SideBarItem handleSelect={setIndex} index={3} selectedIndex={index} url={Routers.MyInfo} icon={<i className="bi bi-person"></i>} title={"My account"}/>
                <SideBarItem handleSelect={handleLogout} index={4} selectedIndex={index} icon={<i className="bi bi-box-arrow-right"></i>} title={"Log out"}/>
            </div>
            {
                createBotModal && <BotModal toggleCreateBotModel={toggleCreateBotModel} confirm={confirm}/>
            }
        </div>
    )
}