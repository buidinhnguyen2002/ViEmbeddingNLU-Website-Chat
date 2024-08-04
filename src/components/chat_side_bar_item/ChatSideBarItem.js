import "./ChatSideBarItem.scss"
import TextButtonIcon from "../icon_text_button/TextButtonIcon";
import {useEffect, useRef, useState} from "react";
import NotificationDialog from "../notification_dialog/NotificationDialog";
export default function ChatSideBarItem({index, selectedIndex, handleSelected}) {
    const [showOptions, setShowOptions] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [titleChat, setTitleChat] = useState("This is title")
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const dropdownRef = useRef(null);
    const renameRef = useRef(null);

    useEffect(() => {
        if (showOptions) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        if(showRename){
            document.addEventListener("mousedown", handleClickOutsideInput);
        }else{
            document.removeEventListener("mousedown", handleClickOutsideInput);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handleClickOutsideInput);
        };
    }, [showOptions,showRename]);
    useEffect(() => {
        if (showRename && renameRef.current) {
            renameRef.current.focus();
        }
    }, [showRename]);
    const handleClickOutsideInput = (event)=>{
        if (renameRef.current && !renameRef.current.contains(event.target)) {
            toggleShowRename();
        }
    }
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            toggleShowOptions();
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            toggleShowRename();
        }
    };
    const onChangeTitle = (e) => {
        setTitleChat(e.target.value);
    };
    const toggleShowDeleteDialog = () => {
        setShowDeleteDialog(!showDeleteDialog);
    }
    const toggleShowRename = () => {
        // renameRef.current.focus();
        setShowRename(!showRename);
        setShowOptions(false);
    }
    const toggleShowOptions = () => {
        setShowOptions(!showOptions);
    }
    return (
        <div onClick={()=>handleSelected(index)} className={`chat_bar__item ${index == selectedIndex ? "chat_bar__item--selected":""}`}>
            <span className="item_title">{titleChat}</span>
            <div className="options_dropdown" ref={dropdownRef}>
                <div onClick={toggleShowOptions} className="btn_option">
                    <i className="bi bi-three-dots"></i>
                </div>
                <div className={`dropdown-content ${showOptions ? "dropdown-content--show":""} `}>
                    <div onClick={toggleShowRename} className="dropdown-btn">
                        <i className="bi bi-pencil-fill"></i>
                        <span className={"dropdown-btn-title"}>Rename</span>
                    </div>
                    <div onClick={toggleShowDeleteDialog} className="dropdown-btn btn-delete">
                        <i className="bi bi-trash-fill"></i>
                        <span className={"dropdown-btn-title"}>Delete</span>
                    </div>
                </div>
            </div>
            <div  className={`rename__container ${showRename ? "rename__container--show":""}`}>
                <input ref={renameRef} onKeyDown={handleKeyDown} onChange={onChangeTitle} value={titleChat} type="text" className="input_rename"/>
            </div>
            {showDeleteDialog && <NotificationDialog title={"Delete chat?"} mesage={`This action will delete "${titleChat}"`} cancelDialog={toggleShowDeleteDialog}/>}
        </div>
    )
}