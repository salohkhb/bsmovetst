import { useEffect, useState } from "react";
import FurnitureCard from "../FurnitureCard";
import api from "../../helpers/api";
import LoadingComponent from "../LoadingComponent";

import styles from "./index.module.css";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";

const FurnitureListPager = ({
  url = "/Products",
  filters = {},
  nItemPage = 12,
}) => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [itemListCount, setItemListCount] = useState();

  function handlePrevPage() {
    if (page >= 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextPage() {
    if (page < itemListCount / nItemPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    async function handleFetch() {
      const countResponse = await api.get(`${url}/count`);
      if (!countResponse?.data?.count) return;
      setItemListCount(countResponse.data.count);
      const listItemResponse = await api.get(`${url}`);
      if (!listItemResponse?.data)
        return console.error("error data : ", listItemResponse);
      setItemList(listItemResponse.data);
    }
    handleFetch();
  }, [page]);

  return loading ? (
    <LoadingComponent />
  ) : (
    <div>
      {itemList?.length &&
        itemList.map((item, index) => (
          <FurnitureCard key={item.id} item={item} index={index} />
        ))}
      <div className={styles.pager_page_handler}>
        <IconButton disabled={page === 1} onClick={handlePrevPage} size="large">
          <div className={styles.pager_page_button}>
            <RemoveIcon />
          </div>
        </IconButton>
        <div className={styles.pager_page_button}></div>
        <div className={styles.pager_page_button}></div>
        <div className={styles.pager_page_button}></div>
        <IconButton
          disabled={page <= itemListCount / nItemPage}
          onClick={handleNextPage}
          size="large"
        >
          <div className={styles.pager_page_button}>
            <AddIcon />
          </div>
        </IconButton>
      </div>
    </div>
  );
};

export default FurnitureListPager;
