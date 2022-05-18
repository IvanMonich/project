import React, {useContext, useEffect, useState} from 'react';
import classes from './AuthPage.module.css'
// import logo from './img/LEDO_logo.png'
import authImg from './img/authImg.svg'
import regName from './img/RegName.svg'
import inpImage from './img/inpImage.svg'
import AuthInput from "../../components/UI/AuthInput/AuthInput";
import AuthButton from "../../components/UI/AuthButton/AuthButton";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";


const AuthPage = () => {
    const [showRegField, setShowRegField] = useState(false)

    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()

    const [form, setForm] = useState({
        email: '', password: '', type: 'user'
    })

    useEffect(() => {
    }, [form.type])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { email: form.email, password: form.password })
            auth.login(data.token, data.userID)
        } catch (e) {
        }
    }

    return (
        <div className={classes.background}>
            {!showRegField &&
                <div className={classes.authField}>
                    <div className={classes.authTittle}>
                        <span className={classes.authText}>Авторизация</span>
                    </div>
                    <span className={classes.tittle}>Войдите в систему, для работы с расписанием!</span>
                    <form action="">
                        <AuthInput name="email" onChange={changeHandler} placeholder="Email" type="email"/>
                        <AuthInput name="password" onChange={changeHandler} placeholder="Password" type="password"/>
                        <AuthButton onClick={loginHandler} disabled={loading} name="LOGIN"/>
                        <img className={classes.mailImage} src={inpImage} alt=""/>
                    </form>
                    <div className={classes.wantReg}>
                        <span className={classes.wantRegButton} onClick={() => setShowRegField(!showRegField)}>Хочу создать аккаунт!</span>
                    </div>
                </div>}
            {showRegField &&
                <div className={classes.authField}>
                    <div className={classes.regTittle}>
                        <span className={classes.regText}>Регистрация</span>
                    </div>
                    <span className={classes.regTextLogin}>Укажите свой логин и пароль для <br/> регистрации в системе.</span>
                    <form action="">
                        <AuthInput name="email" onChange={changeHandler} placeholder="Email" type="email"/>
                        <AuthInput name="password" onChange={changeHandler} placeholder="Password" type="password"/>
                        <div className={classes.regSelectDiv} onChange={changeHandler}>
                            <select name="type" id="" className={classes.regSelect} onChange={changeHandler}>
                                <option value="user">Пользователь</option>
                                <option value="admin">Администратор</option>
                            </select>
                        </div>
                        <AuthButton onClick={registerHandler} disabled={loading} name="SIGN UP"/>
                        <img className={classes.mailImage1} src={inpImage} alt=""/>
                    </form>
                    <div className={classes.goBack} onClick={() => setShowRegField(!showRegField)}/>
                </div>
            }
        </div>
    );
};

export default AuthPage;