import SideBar from "../../components/draw_bar/SideBar";
import "./HomePage.scss"
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserInfo, verifyToken} from "../../services/UserService";
import {saveUserInfo} from "../../store/actions/UserAction";
import Loading from "../../components/loading/Loading";
import {decryptToken} from "../../utils/Functions";
import HomeWelcome from "../../components/HomeWelcome/HomeWelcome";
import {Routers} from "../../utils/Constants";
export default function HomePage(props) {
    const accessToken = decryptToken(localStorage.getItem('access_token') ?? "");
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        handleVerifyToken();
        fetchData();
    }, [accessToken]);
    const fetchData = async () => {
        try {
            const userInfo = await getUserInfo(accessToken);
            dispatch(saveUserInfo(userInfo));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    const handleVerifyToken = async () =>{
        try {
            const verify = await verifyToken(accessToken);
        } catch (error) {
            // console.error('Error fetching user info:', error);
            navigate(Routers.Login);
        }
    }
    return(<div className={"chat"}>
        {isLoading ? <Loading/>: <>
            <SideBar/>
            <div className={"safe_area"}>
                {/*<HomeWelcome/>*/}
                <Outlet/>
            </div>
        </>}
    </div>)
}