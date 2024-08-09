import "./BotItem.scss"
import botsIcon from "../../assets/images/brain_ai.png"
import IconButton from "../icon_button/icon_button";
import {Link} from "react-router-dom";
export default function BotItem({botId,title, description, createAt, toggleEditBot, handleDelete}) {
    const handleDeleteClick = (event) => {
        event.preventDefault();
        handleDelete(botId);
    };
    const handleEditClick = (event) => {
        event.preventDefault();
        toggleEditBot(title, description, botId);
    };
    return (
        <Link to={`/bots/${botId}`} className={"bot_container link"}>
            {/*<Link to={"/bots/botId"} className={"bot_container link"}>*/}
            {/*<div className={"bot_container"}>*/}
                <div className="bot_container__left">
                    <span className="bot_title">{title}</span>
                    <div className="bot_decription__container">
                        <p className="bot_description">{description}</p>
                    </div>
                    <div className="model_name__container">
                        <span className="model_info">ViEmbedding - 256 Tokens - 125k parameters</span>
                    </div>
                    <p className="bot_createat">Create at: {createAt}</p>
                </div>
                <div className="bot_container__right">
                    <img src={botsIcon} alt=""/>
                </div>
                <div className="tools">
                    <IconButton icon={<i className="bi bi-star"></i>} onPress={handleDeleteClick}/>
                    <IconButton icon={<i className="bi bi-pencil"></i>} onPress={handleEditClick}/>
                    {/*<IconButton icon={<i className="bi bi-pencil"></i>} onPress={()=> toggleEditBot(title, description)}/>*/}
                </div>
            {/*</div>*/}
        </Link>
    )
}