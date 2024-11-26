import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

import { useBasket } from "../../hooks/basket";
import Subtitle from "../Texts/Subtitle";
import Routes from "../../helpers/routes";

import messages from "./messages";
import { isObjectEmpty } from "../../helpers/functions";
import { number } from "prop-types";
import { useEffect, useState } from "react";
import { getB64 } from "../../containers/Basket";
import api from "../../helpers/api";

export const SummaryFurnitureItem = ({
  item: { id, price = 0, quantity = 0, name = "[nom_non_defini]" } = {},
}) => {
  const [b64, setB64] = useState("");

  useEffect(() => {
    async function getB64(id) {
      const res = await api.get(`/Products/${id}`);
      setB64(res.data.base64);
    }
    if (id !== undefined) {
      getB64(id);
    }
  }, [id]);
  return (
    <div className="summary-component__content_main_item">
      <div className="summary-component__content_main_item_preview">
        <Image
          className="summary-component__content_main_item_preview_illustration"
          layout="fill"
          src={b64}
          alt={`${name}-${id}`}
        />
      </div>
      <div className="summary-component__content_main_item_infos">
        <div className="summary-component__content_main_item_quantity">
          <div>{name}</div>
          <div>{`x${quantity || 0}`}</div>
        </div>
        <div>{`${price}€`}</div>
      </div>
    </div>
  );
};

const SummaryComponent = ({ deliveryCost = 0 }) => {
  const { basket } = useBasket();
  const router = useRouter();

  function handleRedirectToBasket() {
    return router.push(Routes.BASKET_PAGE);
  }

  return (
    <div className="summary-component__container">
      <Subtitle>{messages.title}</Subtitle>
      <div className="summary-component__content_container">
        <div className="summary-component__content_header">
          <div>{`${basket?.totalItems || "?"} ${messages.articles}`}</div>
          <div
            className="summary-component__content_header_action"
            onClick={handleRedirectToBasket}
          >
            {messages.action.modify}
          </div>
        </div>
        <Divider light fullWidth />
        <div className="summary-component__content_main">
          {!isObjectEmpty(basket) &&
            basket?.items?.map((item, id) => (
              <SummaryFurnitureItem key={item?.id || id} item={item} />
            ))}
        </div>
        <Divider />
        <div className="summary-component__content_prices">
          <div className="summary-component__content_prices_row">
            <div>{messages.cost.articles}</div>
            <div>{`${basket?.totalPrice}€`}</div>
          </div>
          <div className="summary-component__content_prices_row">
            <div>{deliveryCost || messages.cost.delivery}</div>
            <div>{messages.free}</div>
          </div>
        </div>
        <Divider />
        <div className="summary-component__content_total">
          <div>{messages.cost.total}</div>
          <div>{`${Number(basket?.totalPrice) + deliveryCost}€`}</div>
        </div>
      </div>
    </div>
  );
};

SummaryComponent.propTypes = {
  deliveryCost: number,
};

export default SummaryComponent;
