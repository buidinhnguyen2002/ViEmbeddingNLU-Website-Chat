import "./Knowledge.scss"
import botsIcon from "../../assets/icons/bots.png"
import knowledgeImage from"../../assets/images/knowledge.png";
import KnowledgeItem from "../knowledge_item/KnowledgeItem";
import {useState} from "react";
import NotificationDialog from "../notification_dialog/NotificationDialog";
import KnowledgeModal from "../knowledge_modal/KnowledgeModal";
export default function Knowledge() {
    const [showDialog, setShowDialog] = useState(false);
    const [showCreateKnowledge, setShowCreateKnowLedge] = useState(false);
    const [titleKnowledge, setTitleKnowledge] = useState("");
    const [descriptionKnowledge, setDescriptionKnowledge] = useState("");

    const toggleShowDialog = () => {
        setShowDialog(!showDialog);
    }
    const toggleEditKnowledge = (titleKnowledge="", descriptionKnowledge="") => {
        setTitleKnowledge(titleKnowledge);
        setDescriptionKnowledge(descriptionKnowledge);
        setShowCreateKnowLedge(!showCreateKnowledge);
    }

    return (
        <div className={"bot_page"}>
            <div className="bot_page__header">
                <div className="bot_page__title">
                    <img src={knowledgeImage} alt=""/><p className={"title"}>Knowledge</p>
                </div>
                <div onClick={()=>toggleEditKnowledge()} className="bot_page__btn">
                    <div className={"btn_create_bot"}>
                        <p className={"btn_create_bot--text"}>Create knowledge</p>
                    </div>
                </div>
            </div>
            <div className="bot_page__body">
                <table className={"table_wrapper"}>
                    <thead className={"thead--border"}>
                    <tr>
                        <th>Knowledge</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Time</th>
                        <th>Enable</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <KnowledgeItem  type={"Text"} size={"1.9 MB"} toggleShowEdit={toggleEditKnowledge} toggleShowDialog={toggleShowDialog}/>
                        <KnowledgeItem />
                        <KnowledgeItem/>
                    </tbody>
                </table>
            </div>
            {showDialog && <NotificationDialog title={"Comfirm to delete"} mesage={"This is dialogThis is dialogThis is dialogThis is dialogThis is dialogThis is dialog"}
                                               cancelDialog={toggleShowDialog}/>}
            {showCreateKnowledge && <KnowledgeModal title={titleKnowledge} description={descriptionKnowledge} titleForm={"Create knowledge"} toggleShow={toggleEditKnowledge}/>}
        </div>
    )
}