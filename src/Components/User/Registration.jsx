import React, { useEffect, useState } from "react";
import styles from "./user.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, setEmail, setPassword } from "../../redux/Slices/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const password = useSelector((state) => state.auth.password);
  const email = useSelector((state) => state.auth.email);
  const [error, setError] = useState("");
  const [dataEmail, setDataEmail] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const validReg = (email) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const obj = { email, password };
  useEffect(() => {
    axios
      .get("https://6572ddd5192318b7db412a62.mockapi.io/user")
      .then((res) => setDataEmail(res.data));
  }, []);
  const checkedEmail = (obj) => {
    const isRegistered = dataEmail.find((el) => el.email === obj.email);
    if (isRegistered) {
      setError("Пользователь с таким email уже зарегистрирован ");
    } else {
      return obj;
    }
  };
  const registerUser = (obj, event) => {
    if (event) {
      event.preventDefault();
    }
    if (!validReg(obj.email)) {
      setError("Ошибка: Некорректный email ");
    } else if (obj.password.length < 5) {
      setError("Ошибка: Слишком короткий пароль");
    } else {
      const checkedObj = checkedEmail(obj);
      if (checkedObj) {
        axios.post(
          "https://6572ddd5192318b7db412a62.mockapi.io/user",
          checkedObj
        );
        localStorage.setItem("loggedInUser", JSON.stringify(checkedObj));
        setOpen(!open);
        dispatch(setPassword(""));
        dispatch(setEmail(""));
      }
    }
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);

      dispatch(isAuth(true));
    }
  }, []);

  return (
    <div className={styles.login}>
      {!open && !auth ? (
        <div className={styles.form}>
          <span className={styles.text}>Регистрация</span>
          <form
            className={styles.form}
            onSubmit={(event) => registerUser(obj, event)}
          >
            <input
              type="text"
              placeholder="email"
              required
              value={email}
              onChange={(event) => dispatch(setEmail(event.target.value))}
            />
            <input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(event) => dispatch(setPassword(event.target.value))}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}

            <button onClick={() => registerUser(obj)}>
              Зарегистрироваться
            </button>

            <Link to="/authorization">
              <button>Есть аккаунт?</button>
            </Link>
          </form>
        </div>
      ) : (
        <div className={styles.form}>
          <h4>Вы успешно авторизованы</h4>
          <h5>
            Используйте ваш login и password для дальнейшего входа в наш
            магазин!
          </h5>
          <Link to="/home">
            <button onClick={() => dispatch(isAuth(!auth))}>
              За покупками
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Registration;
