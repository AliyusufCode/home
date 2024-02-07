import { useDispatch, useSelector } from "react-redux";
import deleteCartIcon from "../../img/free-icon-garbage-158725.png";
import closeCartIcon from "../../img/backarrow1_80790.svg";
import box from "../../img/box.png";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { deleteCart } from "../../redux/Slices/cartSlice";
const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalProduct = items.reduce((sum, item) => item.count + sum, 0);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.filter.search);

  return (
    <div className="cart">
      <div className="titleCart">
        <h1>Корзина</h1>
        {items.length > 0 ? (
          <div
            onClick={() => dispatch(deleteCart())}
            className="titleCartRight"
          >
            <img src={deleteCartIcon} alt="deleteCart" />
            <h4>Удалить Корзину</h4>
          </div>
        ) : (
          ""
        )}

        <Link to="/home">
          <img src={closeCartIcon} alt="/" />
        </Link>
      </div>
      {items.length > 0 ? (
        <div className="contentCart">
          <div className="carts">
            {items
              .filter((obj) => {
                if (obj.title.toLowerCase().includes(search.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((el) =>
                el.count > 0 ? (
                  <CartItem
                    key={el.id}
                    price={el.price}
                    imageUrl={el.imageUrl}
                    title={el.title}
                    sizes={el.sizes}
                    types={el.types}
                    sale={el.sale}
                    count={el.count}
                    id={el.id}
                  />
                ) : (
                  ""
                )
              )}
          </div>

          <div className="cartRight">
            <h2 className="cartRightTitle">Детали заказа</h2>
            <div className="result">
              <div className="resultDiv">
                <h3>Товаров:{totalProduct} </h3>
              </div>

              <div className="resultDiv">
                <h2>Итого: </h2>
                <div className="div"></div>
                <h2> {totalPrice}₽</h2>
              </div>
              <div className="buttonShopDiv">
                <button className="buttonShop">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart">
          <div className={items.length > 0 ? "titleCart" : "cartEmpty"}>
            <div className="box">
              <img src={box} alt="box" />
            </div>
            <div className="contentCart">
              <div className="carts">
                <h1>Корзина пустая, вернитесь на главную за покупками!</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
