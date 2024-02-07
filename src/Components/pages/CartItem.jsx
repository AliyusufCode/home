import plus from "../../img/free-icon-add-3363871.png";
import minus from "../../img/free-icon-minus-2734848.png";

import del from "../../img/free-icon-close-3945547.png";
import { useDispatch } from "react-redux";
import { minusItem, plusItem, removeItem } from "../../redux/Slices/cartSlice";
const CartItem = ({
  price,
  title,
  types,
  sizes,
  imageUrl,
  id,
  sale,
  count,
}) => {
  const dispatch = useDispatch();
  const onClickMinus = (id) => {
    dispatch(minusItem(id));
  };
  const onClickPlus = (id) => {
    dispatch(plusItem(id));
  };
  const onClcikRemove = (id) => {
    dispatch(removeItem({ id }));
  };
  return (
    <div className="cartItem">
      <img
        className="imageCart"
        style={{ marginLeft: 15 }}
        src={imageUrl}
        alt="a"
      ></img>
      <div className="cardInfo">
        <h3>{title}</h3>
        <ul>
          <li>{types}</li>
          <li>{sizes}</li>
        </ul>
      </div>
      <span className="iconsCartShop">
        <img onClick={() => onClickMinus(id)} src={minus} alt="minus" />
        <b>{count}</b>
        <img onClick={() => onClickPlus(id)} src={plus} alt="plus" />
      </span>
      {sale ? <span className="sale">-{sale}%</span> : ""}
      <div className="cartTotalPrice">
        <div className="span">
          {sale ? (
            <b>
              {parseInt(
                (price * count + price * count * (sale / 100)).toFixed(2)
              )}
              ₽
            </b>
          ) : (
            ""
          )}
        </div>
        <div className={sale ? "price" : ""}>
          <b>{price * count}₽</b>
        </div>
      </div>
      <div className="iconsDelFav">
        <img onClick={() => onClcikRemove(id)} src={del} alt="delete" />
      </div>
    </div>
  );
};
export default CartItem;
