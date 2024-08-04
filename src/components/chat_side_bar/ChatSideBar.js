import "./ChatSideBar.scss";
import ChatSideBarItem from "../chat_side_bar_item/ChatSideBarItem";
import {useState} from "react";
export default function ChatSideBar() {
    const [index, setIndex] = useState('0');
    return (
        <div className={"drawbar drawbar--padding"}>
            <div className="chat__wrapper">
                <ChatSideBarItem index={1} selectedIndex={index} handleSelected={setIndex}/>
                <ChatSideBarItem index={2} selectedIndex={index} handleSelected={setIndex}/>
                <ChatSideBarItem index={3} selectedIndex={index} handleSelected={setIndex}/>
            </div>
        </div>
    )
}