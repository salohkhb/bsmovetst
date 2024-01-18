import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import IconButton from "@mui/material/IconButton";

import { isObjectEmpty } from "../../helpers/functions";
import styles from "./index.module.css";
import Counter from "../Counter";
import { useEstimate } from "../../hooks/estimate";
import { omit } from "ramda";
import { CURRENCY } from "../../helpers/constants";

const S = {};

S.IconButton = styled(IconButton)`
  height: 1.25em;
  width: 1.25em;
  color: ${({ theme }) => theme.colors.border};
`;

function getExtraFurnitureItemCountFromEstimateInventory(
  inventory,
  type,
  item
) {
  const itemInInventory = inventory?.mounting?.extraFurnitures[
    type
  ]?.items?.find((inventoryItem) => inventoryItem?.id === item?.id);
  return itemInInventory?.count ?? 0;
}

const ExtraFurnitureCard = ({ item, withoutPrice = false }) => {
  const { addToEstimateInventoryByKey, estimate } = useEstimate();
  const [count, setCount] = useState(0);

  const { id, name, price, base64 } = item;

  // CHECK ICI PRIX ARRONDIS ? -> différent du shop
  // CHANGER LE BULL CRAFT ET TOUT CE QU'IL Y A SUR LE SCREENSHOT EN FRAGILE

  useEffect(() => {
    if (!isObjectEmpty(item) && item.name) {
      const furnitureList =
        estimate?.inventory?.mounting?.extraFurnitures[item.category]?.items;
      const furniture = furnitureList?.find(
        (furniture) => furniture.name === item?.name
      );
      setCount(isObjectEmpty(furniture) ? 0 : furniture?.count);
    }
  }, [item]);

  async function handleCountInc() {
    setCount((prevCount) => (prevCount ? prevCount + 1 : 1));
    const furnituresList =
      estimate?.inventory?.mounting?.extraFurnitures[item.category]?.items ||
      [];
    const furnitureItem = furnituresList.find(
      (furniture) => furniture.id === item?.id
    );
    if (!isObjectEmpty(furnitureItem)) {
      furnituresList[furnituresList.indexOf(furnitureItem)].count += 1;
      addToEstimateInventoryByKey("mounting", {
        ...estimate?.inventory?.mounting,
        extraFurnitures: {
          ...estimate?.inventory?.mounting?.extraFurnitures,
          [item.category]: {
            ...estimate?.inventory?.mounting?.extraFurnitures[item.category],
            items: furnituresList,
          },
        },
      });
    } else {
      furnituresList?.length
        ? addToEstimateInventoryByKey("mounting", {
            ...estimate?.inventory?.mounting,
            extraFurnitures: {
              ...estimate?.inventory?.mounting?.extraFurnitures,
              [item.category]: {
                items: [
                  ...estimate?.inventory?.mounting?.extraFurnitures[
                    item.category
                  ]?.items,
                  { ...omit(["base64"], item), count: 1 },
                ],
              },
            },
          })
        : addToEstimateInventoryByKey("mounting", {
            ...estimate?.inventory?.mounting,
            extraFurnitures: {
              ...estimate?.inventory?.mounting?.extraFurnitures,
              [item.category]: {
                ...estimate?.inventory?.mounting?.extraFurnitures[
                  item.category
                ],
                items: [{ ...omit(["base64"], item), count: 1 }],
              },
            },
          });
    }
  }

  async function handleCountDec() {
    setCount((prevCount) => {
      if (!prevCount || prevCount <= 0) return 0;
      return prevCount - 1;
    });
    const furnituresList =
      estimate?.inventory?.mounting?.extraFurnitures[item.category]?.items ||
      [];
    const furnitureItem = furnituresList.find(
      (furniture) => furniture.name === item?.name
    );
    if (!isObjectEmpty(furnitureItem)) {
      furnituresList[furnituresList.indexOf(furnitureItem)].count =
        furnituresList[furnituresList.indexOf(furnitureItem)].count > 0
          ? (furnituresList[furnituresList.indexOf(furnitureItem)].count -= 1)
          : 0;
      addToEstimateInventoryByKey("mounting", {
        ...estimate?.inventory?.mounting,
        extraFurnitures: {
          ...estimate?.inventory?.mounting?.extraFurnitures,
          [item.category]: {
            ...estimate?.inventory?.mounting?.extraFurnitures[item.category],
            items: furnituresList,
          },
        },
      });
    }
  }

  return (
    <div className={styles.extra_furniture_card_container}>
      <div className={styles.furniture_card_img_container}>
        <div className={styles.furniture_card_img_illustration_container}>
          <Image
            className={styles.furniture_card_img_illustration}
            layout="fill"
            src={base64 || "/images/logo.png"}
            alt={`${name}-${id}`}
          />
        </div>
      </div>
      <div className={styles.furniture_card_description}>
        <div className={styles.furniture_card_title}>{name}</div>
        {withoutPrice ? null : <div>{`${price}${CURRENCY.EUR}`}</div>}
        <Counter
          minValue={0}
          value={getExtraFurnitureItemCountFromEstimateInventory(
            estimate?.inventory,
            item.category,
            item
          )}
          handleInc={handleCountInc}
          handleDec={handleCountDec}
          margin="50% 0 0 0"
        />
      </div>
    </div>
  );
};

export default ExtraFurnitureCard;
