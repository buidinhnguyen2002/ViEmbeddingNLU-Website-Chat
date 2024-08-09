import "./Files.scss"
import document from "../../assets/images/dataset_text.png";
import KnowledgeItem from "../knowledge_item/KnowledgeItem";
import TrFileItem from "../tr_file_item/TrFileItem";
import NotificationDialog from "../notification_dialog/NotificationDialog";
import {useState} from "react";
import UploadFileModal from "../upload_file_modal/UploadFileModal";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {decryptToken} from "../../utils/Functions";
import {createBot, updateBot} from "../../services/BotsService";
import {actionUpdateBot, addBot} from "../../store/actions/BotsAction";
import {addFileToKnowledge} from "../../services/KnowledgeService";
export default function Files() {
    const { knowledgeId } = useParams();
    const [showDialog, setShowDialog] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const accessToken = decryptToken(localStorage.getItem('access_token'));
    const toggleShowUploadModal = ()=>{
        setShowUploadModal(!showUploadModal);
    }
    const toggleShowDialog = () => {
        setShowDialog(!showDialog);
    }
    const handleUploadDatasets = async (files) => {
        try {
            const data = await addFileToKnowledge(files, knowledgeId, accessToken);
            // dispatch(addBot(data));
            toggleShowUploadModal();
        } catch (error) {
            console.error('Error upload file:', error.message);
        }
    }
    return (
        <div className={"bot_page"}>
            <div className="bot_page__header">
                <div className="bot_page__title">
                    <img className={"img_radius"} src={document} alt=""/><p className={"title"}>Files</p>
                </div>
                <div  className="bot_page__btn">
                    <div onClick={toggleShowUploadModal} className={"btn_create_bot"}>
                        <p className={"btn_create_bot--text"}>Upload dataset</p>
                    </div>
                </div>
            </div>
            <div className="bot_page__body">
                <table className={"table_wrapper"}>
                    <thead className={"thead--border"}>
                    <tr>
                        <th>File</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <TrFileItem type={"docs"} size={"2.5 MB"} toggleShowDialog={toggleShowDialog}/>
                    <TrFileItem type={"docs"} size={"2.5 MB"}/>
                    </tbody>
                </table>
            </div>
            {showDialog && <NotificationDialog title={"Comfirm to delete"} mesage={"This is dialogThis is dialogThis is dialogThis is dialogThis is dialogThis is dialog"}
                                               cancelDialog={toggleShowDialog}/>}
            {showUploadModal && <UploadFileModal confirm={handleUploadDatasets} toggleShow={toggleShowUploadModal}/>}
        </div>
    )
}