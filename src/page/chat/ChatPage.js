import "./ChatPage.scss";
import ChatSideBar from "../../components/chat_side_bar/ChatSideBar";
import ChatArea from "../../components/chat_area/ChatArea";
import DocumentViewer from "../../components/document_viewer/DocumentViewer";
export default function ChatPage() {
    return (
        <div className={"chat"}>
            <ChatSideBar/>
            <div className={"safe_area chat_safe"}>
                <ChatArea/>
                <DocumentViewer/>
            </div>
        </div>
    )
}