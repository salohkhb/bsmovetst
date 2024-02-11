import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Divider, IconButton } from "@mui/material";

import { useBasket } from "../../hooks/basket";
import LoadingComponent from "../../components/LoadingComponent";
import Button from "../../components/Button";
import { Subtitle } from "../../components/Texts";
import {
  findItemQuantityInBasket,
  isObjectEmpty,
} from "../../helpers/functions";
import Routes from "../../helpers/routes";

import styles from "./index.module.css";
import messages from "./messages";
import Counter from "../../components/Counter";
import { useOrder } from "../../hooks/order";
import DeleteDialog from "../../components/DeleteDialog";
import { useGlobal } from "../../hooks/global";
import { useCustomer } from "../../hooks/customer";
import api from "../../helpers/api";

const BasketPageItem = ({ item }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [b64, setB64] = useState("");
  const [count, setCount] = useState(undefined);
  const { basket, resetBasketQuantity, addToBasket, removeFromBasket } =
    useBasket();

  useEffect(() => {
    async function getB64(id) {
      const res = await api.get(`/Products/${id}`);
      setB64(res.data.base64);
    }

    if (
      !isObjectEmpty(item) &&
      !isObjectEmpty(basket?.items) &&
      count === undefined
    ) {
      setCount(findItemQuantityInBasket(item, basket.items));
      getB64(item.id);
    }
  }, [item, basket]);

  function handleDialogOpen() {
    return setDeleteDialogOpen((prevState) => !prevState);
  }

  async function handleCountInc() {
    setCount((prevCount) => (prevCount ? prevCount + 1 : 1));
    addToBasket(item);
  }

  async function handleCountDec() {
    if (count > 0 && count - 1 === 0) {
      return handleDialogOpen();
    }
    setCount((prevCount) => {
      if (prevCount <= 0) return 0;
      return prevCount - 1;
    });
    removeFromBasket(item);
  }

  async function handleDialogConfirm() {
    if (!isObjectEmpty(item)) resetBasketQuantity(item);
    return handleDialogOpen();
  }

  return (
    <>
      <div className={styles.basket_page_item_section}>
        <div className={styles.basket_page_item_section_content}>
          <div className={styles.basket_page_item_section_content_description}>
            <div className={styles.basket_item_preview_container}>
              <Image
                className={styles.basket_item_img_illustration}
                layout="fill"
                src={b64}
                alt={`${item.name}--${item.id}`}
              />
            </div>
            <div>
              <div>{item.name}</div>
            </div>
          </div>
          <div className={styles.basket_page_item_informations}>
            <div style={{ width: "40px" }}>{`${item?.price}€`}</div>
            <Counter
              minValue={0}
              maxValue={20}
              value={count}
              handleInc={handleCountInc}
              handleDec={handleCountDec}
              showHelperMessage={false}
            />
            <div className={styles.basket_item_total_price}>{`${(
              Number(item?.price) * item?.quantity
            ).toFixed(2)}€`}</div>
          </div>
          <IconButton
            edge="end"
            onClick={handleDialogOpen}
            disableRipple
            className={styles.delete_icon}
            size="large"
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDialogOpen}
        fullWidth={true}
        title={messages.dialog.title}
        item={`"${item?.name}" du panier`}
        handleConfirm={handleDialogConfirm}
        handleDeny={handleDialogOpen}
      />
    </>
  );
};

const EmptyBasket = ({ handleEmptyBasketRedirection }) => (
  <div className={styles.empty_basket}>
    <div>{messages.emptyBasket.message}</div>
    <div className={styles.empty_basket_action_container}>
      <Button onClick={handleEmptyBasketRedirection}>
        {messages.emptyBasket.action}
      </Button>
    </div>
  </div>
);

const DesktopBasketTotal = ({ basket }) => {
  return (
    <div className={styles.basket_page_total}>
      <div>{messages.total}</div>
      <div>{`${basket?.totalPrice} €`}</div>
    </div>
  );
};

const BasketItemsList = ({ itemList }) => {
  return (
    <div className={styles.basket_items_grid}>
      {itemList?.map((item) => (
        <BasketPageItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const MobileBasketTotal = ({ basket: { totalPrice, delivery } }) => {
  return (
    <div className={styles.basket_page_total}>
      <Subtitle>{messages.total}</Subtitle>
      <div className={styles.basket_page_total_mobile_section}>
        <div>{messages.mobile.totalItemsCost}</div>
        <div>{`${totalPrice}€`}</div>
      </div>
      <div className={styles.basket_page_total_mobile_section}>
        <div>{messages.mobile.delivery}</div>
        <div>{delivery ? `${delivery}€` : messages.free}</div>
      </div>
      <Divider />
      <div className={styles.basket_page_total_mobile_section}>
        <div style={{ fontWeight: 600 }}>{messages.total}</div>
        <div>{`${delivery ? delivery + totalPrice : totalPrice}€`}</div>
      </div>
    </div>
  );
};

const BasketPageContent = () => {
  const router = useRouter();
  const { auth } = useCustomer();
  const { basket } = useBasket();
  const { addToOrderByKey } = useOrder();
  const {
    global: { screenWidth },
    addToGlobalStateByKey,
  } = useGlobal();

  function handleEmptyBasketRedirection() {
    return router.push(Routes.FURNITURES_BUY_PAGE);
  }

  function handleContinueFunnel() {
    addToOrderByKey("items", basket?.items);
    if (!auth?.id) {
      addToGlobalStateByKey("redirect", Routes.DELIVERY_PAGE);
      return router.push(Routes.LOGIN_PAGE);
    }
    return router.push(Routes.DELIVERY_PAGE);
  }

  return (
    <div className={styles.basket_page_items_container}>
      {isObjectEmpty(basket) || basket?.items?.length <= 0 ? (
        <EmptyBasket
          handleEmptyBasketRedirection={handleEmptyBasketRedirection}
        />
      ) : (
        <BasketItemsList itemList={basket.items} />
      )}
      {!isObjectEmpty(basket) && basket.items?.length ? (
        <div className={styles.basket_page_footer}>
          <div className={styles.basket_page_footer_container}>
            {screenWidth >= 750 ? (
              <DesktopBasketTotal basket={basket} />
            ) : (
              <MobileBasketTotal basket={basket} />
            )}
            <div className={styles.basket_page_action_container}>
              <Button onClick={handleContinueFunnel}>{messages.action}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const BasketContainer = () => {
  const [loading, setLoading] = useState(false);
  const { basket } = useBasket();

  return (
    <div className={styles.basket_page_container}>
      <div className={styles.basket_page_header}>
        <div className={styles.basket_page_title}>{messages.title}</div>
        <div className={styles.basket_page_total_articles}>{`(${
          basket.totalItems || 0
        } ${messages.articles})`}</div>
      </div>
      {loading ? <LoadingComponent /> : <BasketPageContent />}
    </div>
  );
};

export default BasketContainer;
