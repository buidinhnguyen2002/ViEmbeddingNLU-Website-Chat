import './InputChat.scss'
import IconButton from "../icon_button/icon_button";
import {useEffect, useRef, useState} from "react";
export default function InputChat(props) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    return (
        // <div className={"input__wrapper"}>
            <div className={"input__container"}>
                <div className="btn-attach">
                    <i className="bi bi-paperclip"></i>
                </div>
                <div className={"input"}><textarea ref={textareaRef}
                                                   value={message} onChange={handleChange} rows={1}/></div>
                <div className={"btn_send"}>
                    <i className="bi bi-arrow-right"></i>
                </div>
            </div>
        // </div>

    )
}