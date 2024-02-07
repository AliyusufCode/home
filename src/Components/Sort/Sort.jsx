import { useDispatch, useSelector } from "react-redux";
import style from "./sort.module.scss";
import sortIcon from "../../img/icons8-sort-alpha-up-32.png";
import { setSort } from "../../redux/Slices/filterSlice";
import { useState } from "react";
import close from "../../img/free-icon-close-1828666.png";
export const sortList = [
  { name: "Популярности", property: "rating" },
  { name: "Цене", property: "priceSort" },
  { name: "Алфавиту", property: "title" },
];
const Sort = () => {
  const [open, setOpen] = useState(false);
  const sort = useSelector((state) => state.filter.sort);

  const dispatch = useDispatch();
  const onClickSort = (i) => {
    setOpen(!open);
    dispatch(setSort(i));
  };
  const onlickCloseSort = () => {
    setOpen(!open);
    dispatch(setSort({ name: "сортировка по:", property: "rating1" }));
  };
  return (
    <div className={style.sort}>
      {!open && (
        <div onClick={() => setOpen(!open)} className={style.sortIcons}>
          <img src={sortIcon} className={style.sortIconsSizes} alt="sort"></img>
          <h4>{sort.name}</h4>
        </div>
      )}

      {open && (
        <div className={style.popup}>
          <img
            src={close}
            className={style.close}
            alt="close"
            onClick={() => onlickCloseSort()}
          ></img>
          <ul>
            {sortList.map((el, i) => (
              <li
                key={i}
                className={sort.property === el.property ? style.active : ""}
                onClick={() => onClickSort(el)}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;
