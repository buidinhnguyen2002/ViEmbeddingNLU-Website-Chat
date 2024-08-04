import "./TrFileItem.scss";
import {Link} from "react-router-dom";
import IconButton from "../icon_button/icon_button";
import word from "../../assets/images/word.png";
export default function TrFileItem({size, type,toggleShowDialog}) {
    return (
        <>
            <tr className={"tr_knowledge"}>
                <Link to={"/knowledge/knowledgeId/fileId"} className={"knowledge_link"}>
                    <td className={"td_info"}>
                        <div className="knowledge_img">
                            <img src={word} alt=""/>
                        </div>
                        <div className="knowledge__content">
                            <span className="knowledge_title">Example Knowledge 1</span>
                            {/*<span className="knowledge_description">Example Knowledge 1</span>*/}
                        </div>
                    </td>
                </Link>
                <td>{type}</td>
                <td>{size}</td>
                <td>12:00 PM</td>
                <td>
                    <div className={"td_action"}>
                        <IconButton onPress={toggleShowDialog} title={"Delete"} icon={<i className="bi bi-trash-fill"></i>} color={"red"}/>
                    </div>
                </td>
            </tr>

        </>
    )
}