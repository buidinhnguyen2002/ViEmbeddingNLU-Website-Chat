import SideBar from "../../components/draw_bar/SideBar";
import ChatArea from "../../components/chat_area/ChatArea";
import "./HomePage.scss"
import {Outlet} from "react-router-dom";
import InputModal from "../../components/input_modal/InputModal";
export default function HomePage(props) {
    return(<div className={"chat"}>
        <SideBar/>
        <div className={"safe_area"}>
            <Outlet/>
        </div>
        {/*<ChatArea/>*/}
    </div>)
}