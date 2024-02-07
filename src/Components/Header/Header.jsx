import logoHeader from "../../img/logoShopStore.png";
import styles from "./header.module.scss";
import searchIcon from "../../img/search.png";
import favoriteIcon from "../../img/free-icon-heart-outline-61406.png";
import shop from "../../img/shopIcon.png";
import cart from "../../img/icons8-cart-48.png";
import logoutIcon from "../../img/logout.png";
import clear from "../../img/icons8-удалить-50.png";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/Slices/filterSlice";
import { Link } from "react-router-dom";
import { isAuth } from "../../redux/Slices/userSlice";
const Header = () => {
  const search = useSelector((state) => state.filter.search);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const onClickClear = () => {
    dispatch(setSearch(""));
    inputRef.current.focus();
  };

  const items = useSelector((state) => state.cart.items);
  const addedCount = items.reduce((sum, item) => sum + item.count, 0);
  const favoriteds = useSelector((state) =>
    state.favorite.favoriteds.reduce((sum, item) => item.favortedCount + sum, 0)
  );

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(isAuth(false));
  };
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to="/home">
            <div className={styles.iconHeader}>
              <img src={logoHeader} className={styles.logo} alt="logo"></img>
            </div>
          </Link>
          <div className={styles.titleHeader}>
            <h3>
              Магазин <br></br>электроники
            </h3>
          </div>

          <div className={styles.search}>
            <input
              ref={inputRef}
              className={styles.input}
              value={search}
              onChange={(event) => dispatch(setSearch(event.target.value))}
              placeholder="Найти товар"
            ></input>
            <img className={styles.icon} src={searchIcon} alt="search"></img>
            {search && (
              <img
                className={styles.clear}
                onClick={onClickClear}
                src={clear}
                alt="clear"
              ></img>
            )}
          </div>
        </div>
        <div className={styles.rigthHeader}>
          <div className={styles.favIcon}>
            {favoriteds ? <span>{favoriteds}</span> : ""}
            <Link to="/favorite">
              <img
                src={favoriteIcon}
                className={styles.iconFavorite}
                alt="favorite"
              ></img>
            </Link>
          </div>
          <div className={styles.shopIcon}>
            <Link to="/orders">
              <img src={shop} className={styles.iconOrders} alt="order"></img>
            </Link>
          </div>
          <div className={styles.cartIcon}>
            {addedCount ? <span>{addedCount}</span> : ""}
            <Link to="/cart">
              <img src={cart} className={styles.iconCart} alt="cart"></img>
            </Link>
          </div>
          <div className={styles.logDiv}>
            <img
              src={logoutIcon}
              onClick={() => logout()}
              className={styles.iconLogout}
              alt="logout"
            ></img>
          </div>
        </div>
      </div>
      <hr style={{ margin: 0 }}></hr>
    </div>
  );
};
export default Header;
