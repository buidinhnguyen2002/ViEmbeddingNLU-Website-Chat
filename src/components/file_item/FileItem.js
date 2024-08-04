import "./FileItem.scss"
import word from "../../assets/images/word.png"
import IconButton from "../icon_button/icon_button";
export default function FileItem({fileName, deleteFile}) {
    return (
        <div className="file_item">
            <div className="file_img">
                <img src={word} alt=""/>
            </div>
            <p className="file_name">{fileName}</p>
            <div onClick={deleteFile} className="delete_file">
                <div className="btn_close">
                    <i className="bi bi-x"></i>
                </div>
            </div>
        </div>
    )
}