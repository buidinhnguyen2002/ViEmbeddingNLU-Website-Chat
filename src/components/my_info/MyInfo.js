import knowledgeImage from "../../assets/images/knowledge.png";
import "./MyInfo.scss"
import {useSelector} from "react-redux";

export default function MyInfo() {
    const avatar = useSelector((state) => state.userReducer.avatar);
    const username = useSelector((state) => state.userReducer.username);
    return (
        <>
            <div className="bot_page__header">
                <div className="bot_page__title">
                    {/*<img src={knowledgeImage} alt=""/>*/}
                    <p className={"title"}>My account</p>
                </div>
            </div>
            <div className="bot_page__body">
                <div className="avatar">
                    <img src={avatar} alt=""/>
                </div>
            </div>
        </>
    )
}