import knowledgeImage from"../../assets/images/dataset_text.png"
import "./KnowLedgeItem.scss"
import IconButton from "../icon_button/icon_button";
import {Link} from "react-router-dom";
export default function KnowledgeItem({title, description,knowledgeId,type, size, time, enable, toggleShowDialog, toggleShowEdit}) {
    return(
        <>
                <tr className={"tr_knowledge"}>
                    <Link to={`/knowledge/${knowledgeId}/files`} className={"knowledge_link"}>
                        <td className={"td_info"}>
                            <div className="knowledge_img">
                                <img src={knowledgeImage} alt=""/>
                            </div>
                            <div className="knowledge__content">
                                <span className="knowledge_title">{title}</span>
                                <span className="knowledge_description">{description}</span>
                            </div>
                        </td>
                    </Link>
                    <td>{type}</td>
                    <td>{size}</td>
                    <td>12:00 PM</td>
                    <td><input type="checkbox" checked/></td>
                    <td>
                        <div className={"td_action"}>
                            <IconButton onPress={()=> toggleShowEdit(title, description, knowledgeId)} title={"Edit"} icon={<i className="bi bi-pencil-fill"></i>} color={"#38c538"}/>
                            <IconButton onPress={()=>toggleShowDialog(knowledgeId)} title={"Delete"} icon={<i className="bi bi-trash-fill"></i>} color={"red"}/>
                        </div>
                    </td>
                </tr>

        </>
    )
}