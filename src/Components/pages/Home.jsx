import { useEffect, useState } from "react";
import Sort from "../Sort/Sort";
import axios from "axios";
import Sceleton from "./Sceleton";
import Categories from "../Categories/Categories";
import CardItem from "./CardItem";

import { useSelector } from "react-redux";
import Registration from "../User/Registration";

const Home = () => {
  const sceletFake = [1, 2, 3, 4, 5, 6];
  const search = useSelector((state) => state.filter.search);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sort = useSelector((state) => state.filter.sort);
  const categoryId = useSelector((state) => state.filter.categoryId);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://6572ddd5192318b7db412a62.mockapi.io/items?category=${
          categoryId ? categoryId : 0
        }&sortBy=${sort.property}&order=asc`
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, [sort.property, categoryId]);
  const auth = useSelector((state) => state.auth.auth);

  return (
    <div>
      {auth ? (
        <div className="content">
          <div className="test">
            <Categories />
            <Sort />
          </div>
          <h1 className="titleContent">
            {search ? `Результаты поиска :${search}` : "Все товары"}
          </h1>
          <div className="items">
            {loading
              ? sceletFake.map((el, i) => <Sceleton key={i} />)
              : items
                  .filter((obj) => {
                    if (
                      obj.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((el) => (
                    <CardItem
                      key={el.id}
                      price={el.price}
                      imageUrl={el.imageUrl}
                      title={el.title}
                      sizes={el.sizes}
                      types={el.types}
                      sale={el.sale}
                      id={el.id}
                    />
                  ))}
          </div>
        </div>
      ) : (
        <Registration />
      )}
    </div>
  );
};
export default Home;
