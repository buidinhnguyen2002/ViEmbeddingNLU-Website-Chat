import "./UploadFileModal.scss"
import InputModal from "../input_modal/InputModal";
import TextAreaModal from "../textarea_modal/TextAreaModal";
import FileItem from "../file_item/FileItem";
import TextButtonIcon from "../icon_text_button/TextButtonIcon";
import {useRef, useState} from "react";
export default function UploadFileModal({toggleShow, confirm}) {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const handleChooseFile = () => {
        fileInputRef.current.click();
    };
    const uploadDocument = (e) => {
        const files = e.target.files;
        setFiles(prevFiles => [...prevFiles, ...files]);
    }
    const handleFileRemove = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };
    return (
        <div className="overlay">
            <div className="new_bot__modal ">
                <h2 className="title_form">Add files</h2>
                <form className={"new_bot__modal-body"}>
                     <div className={"form-field"}>
                        <label className={"label"}>Upload</label>
                        <div className="input__wrapper">
                            <input className={"input_file"} onChange={uploadDocument} type={"file"} ref={fileInputRef} multiple/>
                            <div onClick={handleChooseFile} className="upload">
                                <i className="bi bi-cloud-arrow-up-fill"></i>
                                <span className="input-title">Click to upload</span>
                                <span className="input-sub">Up load format TXT, DOC, PDF</span>
                            </div>
                        </div>
                        <div className="files_container">
                            {files.map((file, index)=><FileItem fileName={file.name} deleteFile={()=>handleFileRemove(index)}/>)}
                        </div>
                    </div>
                </form>
                <div className="new_bot__modal-footer">
                    <TextButtonIcon title={"Cancel"} onPress={toggleShow} background={"#FFFFFF"} color={"#1C1C1C"}/>
                    <TextButtonIcon title={"Confirm"} onPress={()=>confirm()}/>
                </div>
            </div>
        </div>
    )
}