import styles from "./categories.module.scss";

import close from "../../img/free-icon-close-1828666.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../redux/Slices/filterSlice";
const Categories = () => {
  const [open, setOpen] = useState(false);
  const catalogList = ["Ноутбуки", "Смартфоны", "Наушники"];

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  return (
    <div className={styles.root}>
      {open && (
        <div onClick={() => setOpen(!open)}>
          <span className={styles.catalog}>
            <h2>Каталог</h2>
          </span>
        </div>
      )}
      {!open && (
        <div>
          <ul className={styles.ul}>
            {catalogList.map((el, i) => (
              <li
                key={i}
                className={categoryId === i ? styles.active : ""}
                onClick={() => dispatch(setCategoryId(i))}
              >
                {el}
              </li>
            ))}
            <div>
              <img
                src={close}
                className={styles.close}
                alt="close"
                onClick={() => setOpen(!open)}
              ></img>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
