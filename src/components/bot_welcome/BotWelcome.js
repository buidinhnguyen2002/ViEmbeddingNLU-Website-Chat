import "./BotWelcome.scss"
import bot from "../../assets/images/bot.png";
export default function BotWelcome() {
    return (
        <div className={"bot_welcome"}>
            <div className="image_bot">
                <img src={bot} alt=""/>
            </div>
            <div className={"content__wrapper"}>
                <span className={"title_large"}>Welcome User!</span>
                <span className={"sub_info"}>Select an existing chat or create a new one to get started</span>
            </div>
        </div>
    )
}