import React, { useEffect, useState } from "react";
import styles from "./user.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  isAuth,
  setEmail,
  setId,
  setPassword,
} from "../../redux/Slices/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";
const Authorization = () => {
  const [error, setError] = useState("");
  const password = useSelector((state) => state.auth.password);
  const email = useSelector((state) => state.auth.email);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    axios
      .get("https://6572ddd5192318b7db412a62.mockapi.io/user")
      .then((data) => setData(data.data));
  }, []);
  const regUser = data.find(
    (el) => el.email === email && el.password === password
  );

  const validAuth = (email) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authorizationUser = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!validAuth(email)) {
      setError("Ошибка: Некорректный email ");
    } else if (password.length < 5) {
      setError("Ошибка: Слишком короткий пароль");
    } else if (!regUser) {
      setError("Ошибка: Неверный email или пароль");
    } else {
      dispatch(isAuth(!auth));
      dispatch(setId(regUser.id));
      localStorage.setItem("loggedInUser", JSON.stringify(regUser));
    }
  };

  const onClickAddUser = () => {
    authorizationUser();
  };

  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <span className={styles.text}>Авторизация</span>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Ваш email"
            required
            value={email}
            onChange={(event) => dispatch(setEmail(event.target.value))}
          />
          <input
            type="password"
            placeholder="Ваш password"
            required
            value={password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Link to={regUser && "/home"}>
            <button onClick={onClickAddUser} disabled={""}>
              Войти
            </button>
          </Link>

          <Link to="/">
            <button>Назад</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
