import logo from './logo.svg';
import './styles/styles.scss';
import HomePage from "./page/home/HomePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import Login from "./page/login/login";
import {Routers} from "./utils/Constants";
import VerifyAccount from "./page/verify_account/VerifyAccount";
import {infoUserLoader} from "./services/Loaders";
import Bot from "./components/bot/Bot";
import Knowledge from "./components/knowledge/Knowledge";
import Files from "./components/files/Files";
import FileDetail from "./components/file_detail/FileDetail";
import ChatPage from "./page/chat/ChatPage";
import {useDispatch, useSelector} from "react-redux";
import ChatWindow from "./components/chat_window/ChatWindow";
import HomeWelcome from "./components/HomeWelcome/HomeWelcome";
import MyInfo from "./components/my_info/MyInfo";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const router = createBrowserRouter(
      [
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: Routers.VerifyAccount,
          element: <VerifyAccount/>,
        },
        {
          path: "/",
          element: <HomePage/>,
          // element: <Login />,
          children: [
              {
                  path: "",
                  element: <HomeWelcome/>,
              },
            {
              path: "/bots",
              element: <Bot/>,
            },
            {
              path: "knowledge",
              element: <Knowledge/>,
            },
              {
                  path: "myInfo",
                  element: <MyInfo/>,
              },
            {
              path: "/knowledge/:knowledgeId",
              element: <Files/>,
            },
            {
              path: "/knowledge/knowledgeId/fileId",
              element: <FileDetail/>,
            },
          ],
        },
        {
          path: "/bots/:botId",
          element: <ChatPage/>,
            children:[
                {
                    path: "chat/:chatId",
                    element: <ChatWindow/>,
                },
            ]
        },
      ]
  );
  return (
    // <><HomePage/></>
      <RouterProvider router={router}/>
  );
}

export default App;
