import React, {useState, useEffect} from "react";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './login.scss';
import imgEllipse1 from '../../assets/images/Ellipse 1.png';
import imgEllipse2 from '../../assets/images/Ellipse 2.png';
import imgPolygon1 from '../../assets/images/Polygon 1.png';
import imgPolygon2 from '../../assets/images/Polygon 2.png';
import imgPolygon3 from '../../assets/images/Polygon 3.png';
import imgSubtract from '../../assets/images/Subtract.png';
// import {callAPILogin, callAPIRegister, client, reConnectionServer} from '../../service/loginService';
// import {loginSuccess} from "../../store.js/actions/userAction";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import CryptoJS from 'crypto-js';
import {login, signup} from "../../services/UserService";
import {Routers} from "../../utils/Constants";
import {loginSuccess} from "../../store/actions/UserAction";
import {encryptToken} from "../../utils/Functions";
// import {decryptData, encryptData} from "../../util/function";

function Login() {
    const [status, setStatus] = useState('login');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [error, setError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem('dataReLogIn');
        // reConnectionServer();
        if (storedData) {
            navigate('/chat');
        }
    }, [navigate]);

    const handleOnchangeInput = (event) => {
        const {name, value} = event.target;
        if (name === 'userName') {
            setUserName(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
        if (name === 'retypePassword') {
            setRetypePassword(value);
        }
    }

    const changeStatus = () => {
        if (status === 'login') {
            setStatus('register');
        } else {
            setStatus('login');
        }
    }

    const handleLogin = async () => {
        if (userName === '' || password === '') {
            setError('Vui lòng nhập tài khoản và mật khẩu');
            return;
        }
        await login(userName, password).then(data  =>{
            if(data.status == 403){
                navigate(Routers.VerifyAccount, { state: { email: userName}});
            }else{
                const encryptedAccessToken = encryptToken(data.access_token);
                const encryptedRefreshToken = encryptToken(data.refresh_token);
                localStorage.setItem('access_token', encryptedAccessToken);
                localStorage.setItem('refresh_token', encryptedRefreshToken);
                navigate(Routers.Home, { state: { email: userName}});

            }
        }).catch(error => {
            console.log(error.message);
            setError(error.message);
            return;
        });
    };

    const handleRegister = async () => {
        if (userName === '' || password === '' || retypePassword === '') {
            setError('Vui lòng nhập thông tin');
            return;
        }
        if (password !== retypePassword) {
            setError('Mật khẩu và mật khẩu nhập lại không trùng nhau');
            return;
        }
        await signup(password, userName).then(data  =>{
            navigate(Routers.VerifyAccount, { state: { email: userName}});
        }).catch(error => {
            setError(error.message);
            return;
        });
    };

    const toggleShowPassword = (event) => {
        const name = event.target.parentElement.getAttribute('name');
        const value = name === 'showPassword' ? !showPassword : !showRetypePassword;
        setShowPassword(value);
    }
    useEffect(() => {
        setError("");
    }, [status]);
    return (
        <div className="login-background col-12 d-flex justify-content-center align-items-center">
            <div className="login-container">
                <div className="title-login">
                    <h4 className="title-form">{status === 'login' ? 'Login' : 'Register'}</h4>
                </div>
                <div className="input-container">
                    <input className="d-block" type="text" name="userName" placeholder="Username" value={userName}
                           onChange={handleOnchangeInput}/>
                    <div className="password-wrapper">
                        <input className="d-block" name="password" type={showPassword ? 'text' : 'password'}
                               placeholder="Password" value={password}
                               onChange={handleOnchangeInput}/>
                        <span style={{cursor: 'pointer'}} name="showPassword" onClick={toggleShowPassword}>
                            <i className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                        </span>
                    </div>
                    {status === 'register' && <div className="password-wrapper">
                        <input className="d-block" type={showRetypePassword ? 'text' : 'password'} name="retypePassword"
                               placeholder="Retype password" value={retypePassword}
                               onChange={handleOnchangeInput}/>
                        <span style={{cursor: 'pointer'}} name="showRetypePassword" onClick={toggleShowPassword}>
                            <i className={showRetypePassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                        </span>
                    </div>}
                </div>
                {error && <p className="error-message">{error}</p>}
                {registerSuccess && (
                    <>
                        <div className="success-message show-overlay">
                            <div className="tick-icon">
                                <span>&#10004;</span>
                            </div>
                            <p>Đăng ký thành công!</p>
                        </div>
                        <div className="overlay"></div>
                    </>
                )}


                <button className="btn-login col-12" onClick={status === 'login' ? handleLogin : handleRegister}>
                    {status === 'login' ? 'Login' : 'Register'}
                </button>
                <hr style={{borderColor: "#FFFFFF", borderWidth: "1px"}}/>
                <div className="register-container" onClick={changeStatus}>
                    <a>{status === 'login' ? 'Register' : 'Login'}</a>
                </div>
            </div>
            <div className="img-decoration-container">
                <img className="img-polygon1" src={imgPolygon1} alt=""/>
                <img className="img-polygon2" src={imgPolygon2} alt=""/>
                <img className="img-polygon3" src={imgPolygon3} alt=""/>
                <div className="img-ellipse-wrapper">
                    <img className="img-ellipse1" src={imgEllipse1} alt=""/>
                    <img className="img-ellipse2" src={imgEllipse2} alt=""/>
                </div>
                <img className="img-subtract" src={imgSubtract} alt=""/>
            </div>
        </div>
    );
}

export default Login;