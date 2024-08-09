import botsIcon from "../../assets/images/bot.png"
import "./Bot.scss"
import BotItem from "../bot_item/BotItem";
import {useEffect, useState} from "react";
import BotModal from "../bot_modal/BotModal";
import {getBots, getUserInfo} from "../../services/UserService";
import {saveUserInfo} from "../../store/actions/UserAction";
import {useDispatch, useSelector} from "react-redux";
import {actionDeleteBot, actionUpdateBot, addBot, saveBots} from "../../store/actions/BotsAction";
import Loading from "../loading/Loading";
import {createBot, deleteBot, updateBot} from "../../services/BotsService";
import {decryptToken} from "../../utils/Functions";
export default function Bot() {
    const [editBotModal, setEditBotModal] = useState(false);
    const [titleBot, setTitleBot] = useState("");
    const [descriptionBot, setDescriptionBot] = useState("");
    const [botIdEdit, setBotIdEdit] = useState("");
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    const bots = useSelector((state) => state.botReducer.bots);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, [accessToken]);
    const fetchData = async () => {
        try {
            const data = await getBots(accessToken);
            dispatch(saveBots(data.bots));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching bots:', error.message);
        }
    };
    const toggleEditBotModel = (titleBot="", descriptionBot="", botId = "") => {
        setTitleBot(titleBot);
        setDescriptionBot(descriptionBot);
        setBotIdEdit(botId);
        setEditBotModal(!editBotModal);
    }
    const confirm = async (titleBot, descriptionBot, botId) => {
        try {
            if(botId){
                const data = await updateBot(botId,titleBot, descriptionBot, accessToken);
                dispatch(actionUpdateBot(data));
            }else{
                const data = await createBot(titleBot, descriptionBot,accessToken);
                dispatch(addBot(data));
            }
            toggleEditBotModel();
        } catch (error) {
            console.error('Error create bot:', error.message);
        }
    }
    const handleDelete = async (botId) => {
        try {
            const data = await deleteBot(botId, accessToken);
            dispatch(actionDeleteBot(data));
        } catch (error) {
            console.error('Error create bot:', error.message);
        }
    }
    return (
        <>
            {isLoading ? <Loading/> : <div className={"bot_page"}>
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
                    {bots.map((bot, index)=>{
                        return <BotItem handleDelete={handleDelete} botId={bot.bot_id} title={bot.name} description={bot.description} createAt={bot.created_at} toggleEditBot={toggleEditBotModel}/>
                    })}
                </div>
                {editBotModal && <BotModal botId={botIdEdit} confirm={confirm} title={titleBot} description={descriptionBot} toggleCreateBotModel={toggleEditBotModel}/>}
            </div>}
        </>

    )
}