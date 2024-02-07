import { Link } from "react-router-dom";
import closeCartIcon from "../../img/backarrow1_80790.svg";
import smile from "../../img/smile.png";
const Orders = () => {
  return (
    <div className="content">
      <div className="favorite">
        <div className="titleFav">
          <h1>Купленные товары</h1>

          <Link to="/home">
            <img src={closeCartIcon} alt="/" />
          </Link>
        </div>
      </div>

      <div className="items">
        <div className="contentSmile">
          <div className="smile">
            <img className="smileIcon" src={smile} alt="smile" />
          </div>
          <div className="favoritedEmpty">
            <div>
              <h2>Вы пока ничего не купили</h2>
              <h3>Оформите первый заказ.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;
