import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryItemsThunk } from "../../store/item";

import "./Category.css";

function randomPick(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Category() {
  const { category_name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchCategoryItemsThunk(category_name))
  }, [dispatch,category_name]);

  let items = Object.values(
    useSelector((state) => (state.items.allItems ? state.items.allItems : {}))
  );
  if (!items.length) return null;
  //sort the items randomly
  items.sort(() => Math.random() - 0.5);
  const shuffledItems = randomPick(items);


  return (
    <>

      <div className="page-container">
        <div className="items-container">
          {items.map((item) => {

            return (
              <>
                <div className="single-product-container" key={item.id}>

                  <img
                    className="preview-image cursor"
                    src={item.img_1}
                    alt={item.img_1}
                    onClick={() => history.push(`/listings/${item.id}`)}
                  />

                  <div className="price"><span>${item.price}</span></div>

                </div>
              </>
            );
          }
          )}
        </div>

      </div >
    </>
  )



}


export default Category;
