import { useState } from "react";
import favorite from "../../img/heart.svg";
import likedFavorite from "../../img/liked.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/Slices/cartSlice";
import { addFavorited } from "../../redux/Slices/favoriteSlice";
const CardItem = ({ id, title, price, imageUrl, sale, types, sizes }) => {
  const [sizesId, setSizesId] = useState(0);
  const [typesId, setTypesId] = useState(0);

  const typesList = types.map((item) => Object.values(item)[0]);

  const dispatch = useDispatch();

  const addPropsFavoriteds = {
    title,
    price,
    imageUrl,
    id,
    sale,
    types,
    sizes,
  };
  const onClickAdd = () => {
    dispatch(addItems(addProps));
  };
  const items = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const onClickAddFavorited = () => {
    dispatch(addFavorited(addPropsFavoriteds));
  };
  const favoriteds = useSelector((state) =>
    state.favorite.favoriteds.find((obj) => obj.id === id)
  );

  const addedCount = items ? items.count : 0;
  const fav = favoriteds ? favoriteds.favortedCount : -1;
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSizeClick = (i) => {
    setSelectedImage(i);
    setTypesId(i);
  };
  const addProps = {
    title,

    price: typesId !== 0 ? price[1][sizesId] : price[0][sizesId],
    imageUrl: imageUrl[0][selectedImage]
      ? imageUrl[0][selectedImage]
      : imageUrl[0][selectedImage + 1],
    id,
    sale,
    types: typesList[typesId],
    sizes: sizes[sizesId],
  };

  return (
    <div className="cardItem">
      <div className="cartTop">
        <span className={sale && "sale"}>{sale ? `${-sale}% Cкидка` : ""}</span>
        <img
          onClick={() => onClickAddFavorited(id)}
          className="favorite"
          src={fav > 0 ? likedFavorite : favorite}
          alt="favorite"
        ></img>
      </div>
      <img
        src={
          imageUrl[0][selectedImage]
            ? imageUrl[0][selectedImage]
            : imageUrl[0][selectedImage + 1]
        }
        alt="imageUrl"
      ></img>
      <h2 className="cardTitle">{title}</h2>
      <div className="cardSelector">
        <ul>
          {typesList.map(
            (el, i) =>
              el !== undefined && (
                <li
                  key={i}
                  className={typesId === i ? "active" : ""}
                  onClick={() => handleSizeClick(i)}
                >
                  {el}
                </li>
              )
          )}
        </ul>

        <ul>
          {sizes.map(
            (el, i) =>
              el !== "" && (
                <li
                  onClick={() => setSizesId(i)}
                  key={i}
                  className={sizesId === i ? "active" : ""}
                >
                  {el}
                </li>
              )
          )}
        </ul>
      </div>
      <div className="cartBottom">
        <span>{typesId !== 0 ? price[1][sizesId] : price[0][sizesId]} ₽</span>
        <button onClick={onClickAdd}>
          <h3>Купить</h3>
          {addedCount > 0 ? <b>{addedCount}</b> : ""}
        </button>
      </div>
    </div>
  );
};
export default CardItem;
