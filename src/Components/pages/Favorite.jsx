import deleteCartIcon from "../../img/free-icon-garbage-158725.png";
import closeCartIcon from "../../img/backarrow1_80790.svg";
import notFavorite from "../../img/NoFavorite.png";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";
import { deleteFavoriteds } from "../../redux/Slices/favoriteSlice";

const Favorite = () => {
  const favoriteds = useSelector((state) => state.favorite.favoriteds);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.filter.search);
  return (
    <div className="content">
      <div className="favorite">
        <div className="titleFav">
          <h2>
            Избранные <br></br> товары
          </h2>
          {favoriteds.length > 0 ? (
            <div
              onClick={() => dispatch(deleteFavoriteds())}
              className="favoriteIconDel"
            >
              <img src={deleteCartIcon} alt="deleteCart" />
              <h4>Удалить всё</h4>
            </div>
          ) : (
            ""
          )}

          <Link to="/home">
            <img src={closeCartIcon} alt="/" />
          </Link>
        </div>
      </div>

      <div className="items">
        {favoriteds.length > 0 ? (
          favoriteds
            .filter((obj) => {
              if (obj.title.toLowerCase().includes(search.toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((el, i) => (
              <CardItem
                key={i}
                price={el.price}
                imageUrl={el.imageUrl}
                title={el.title}
                sizes={el.sizes}
                types={el.types}
                sale={el.sale}
                count={el.count}
                id={el.id}
              />
            ))
        ) : (
          <div className="favoritedEmpty">
            <div className="notFavorite">
              <img src={notFavorite} alt="no" />
            </div>
            <h2>В избранном нет товаров</h2>
            <h3>
              Вы можете найти на сайте интересные товары и добавить их в
              избранное чтобы не потерять
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorite;
