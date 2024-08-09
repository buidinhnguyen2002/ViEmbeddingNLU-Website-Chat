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
import {Provider, useDispatch} from "react-redux";
import store from "./store/store";
import VerifyAccount from "./page/verify_account/VerifyAccount";
import {Routers} from "./utils/Constants";
import {infoUserLoader} from "./services/Loaders";
import HomePage from "./page/home/HomePage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
