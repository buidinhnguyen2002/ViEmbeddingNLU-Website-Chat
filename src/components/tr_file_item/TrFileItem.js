import "./TrFileItem.scss";
import {Link} from "react-router-dom";
import IconButton from "../icon_button/icon_button";
import word from "../../assets/images/word.png";
import pdf from "../../assets/images/pdf.png";
export default function TrFileItem({knowledgeId,fileId, name, chunkCount,size, type,toggleShowDialog}) {
    const getIcon = () =>{
        if(type == "pdf") return pdf;
        return word;
    }
    return (
        <>
            <tr key={fileId} className={"tr_knowledge"}>
                <Link to={`/knowledge/${knowledgeId}/files/${fileId}`} className={"knowledge_link"}>
                    <td className={"td_info"}>
                        <div className="knowledge_img">
                            <img src={getIcon()} alt=""/>
                        </div>
                        <div className="knowledge__content">
                            <span className="knowledge_title">{name}</span>
                            {/*<span className="knowledge_description">Example Knowledge 1</span>*/}
                        </div>
                    </td>
                </Link>
                <td>{type}</td>
                <td>{size}</td>
                <td>{chunkCount}</td>
                <td>
                    <div className={"td_action"}>
                        <IconButton onPress={toggleShowDialog} title={"Delete"} icon={<i className="bi bi-trash-fill"></i>} color={"red"}/>
                    </div>
                </td>
            </tr>

        </>
    )
}