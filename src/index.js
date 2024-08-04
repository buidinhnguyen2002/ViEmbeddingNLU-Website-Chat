import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ChatArea from "./components/chat_area/ChatArea";
import Bot from "./components/bot/Bot";
import Knowledge from "./components/knowledge/Knowledge";
import Files from "./components/files/Files";
import FileDetail from "./components/file_detail/FileDetail";
import ChatPage from "./page/chat/ChatPage";
import Login from "./page/login/login";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login/>,
        },
      {
        path: "/",
        element: <App/>,
          // element: <Login />,
          children: [
              {
                  path: "/bots",
                  element: <Bot/>,
              },
              {
                  path: "knowledge",
                  element: <Knowledge/>,
              },
              {
                  path: "/knowledge/knowledgeId",
                  element: <Files/>,
              },
              {
                  path: "/knowledge/knowledgeId/fileId",
                  element: <FileDetail/>,
              },
          ],
      },
        {
            path: "/bots/botId",
            element: <ChatPage/>,
        },
    ]
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
