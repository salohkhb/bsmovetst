import Divider from "@mui/material/Divider";
import styles from "../index.module.css";
import EstimateSection from "../../section";
import messages from "../messages";
import { useEstimate } from "../../../../hooks/estimate";
import { CURRENCY, METRICS } from "../../../../helpers/constants";
import { EstimateSummaryInformationBlock, UNKNOW } from "../index";
import {
  FRIDGE_OPTIONS,
  PIANO_OPTIONS,
  POOL_TABLE_OPTIONS,
  SAFE_OPTIONS,
} from "../../Inventory/FirstPart";
import { mountingHelpNeededOptions } from "../../Inventory/constants";

const EstimateSummaryItem = ({ item = {} }) => {
  return (
    <div className={styles.summary_estimate_section_inventory_item}>
      <span className={styles.summary_estimate_section_inventory_item_name}>
        {item?.name}
      </span>
      <span>x{item?.count}</span>
    </div>
  );
};

const EstimateSummaryItemList = ({ itemList = [] }) => (
  <div className={styles.summary_estimate_section_inventory_container}>
    {itemList.map((item, index) =>
      item?.count > 0 ? <EstimateSummaryItem item={item} key={index} /> : null
    )}
  </div>
);

const SummaryInventorySection = () => {
  const {
    estimate: {
      inventory: {
        mounting: {
          mountingType,
          items,
          extraFurnitures: {
            standard: { items: standardItems = [] } = {},
            fragile: { items: fragileItems = [] } = {},
            others: { items: othersItems = [] } = {},
            needed: extraFurnituresNeeded = false,
          } = {},
        } = {},
        volume = {},
        heavyObjects,
      } = {},
    },
    priceCalculator: { totalPrice = 0 } = {},
  } = useEstimate();
  return (
    <EstimateSection title={messages.sections.inventory.title}>
      <Divider />
      <h3 style={{ paddingTop: "1em", paddingBottom: "1em" }}>Volumes</h3>
      <section className={styles.estimate_informations_container}>
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.volume}
          content={
            (volume?.volume &&
              !isNaN(volume.volume) &&
              `${Number(volume.volume).toFixed(2)}${METRICS.CUBE}`) ||
            UNKNOW
          }
        />
      </section>
      <Divider />
      <h3 style={{ paddingTop: "1em", paddingBottom: "1em" }}>
        {messages.sections.informations.blockLabel.heavy}
      </h3>
      <section className={styles.estimate_informations_container}>
        {heavyObjects?.items?.piano?.present ? (
          <>
            <EstimateSummaryInformationBlock
              label="Type de piano"
              content={
                PIANO_OPTIONS.find(
                  (option) => option.value === heavyObjects.items.piano.type
                )?.label || UNKNOW
              }
            />
            <EstimateSummaryInformationBlock
              label="Etages"
              content={heavyObjects.items.piano.floors}
            />
          </>
        ) : null}
        {heavyObjects?.items?.fridge?.present ? (
          <>
            <EstimateSummaryInformationBlock
              label="Type de frigo"
              content={
                FRIDGE_OPTIONS.find(
                  (option) => option.value === heavyObjects.items.fridge.type
                )?.label || UNKNOW
              }
            />
            <EstimateSummaryInformationBlock
              label="Etages"
              content={heavyObjects.items.fridge.floors}
            />
          </>
        ) : null}
        {heavyObjects?.items?.safe?.present ? (
          <>
            <EstimateSummaryInformationBlock
              label="Type de coffre fort"
              content={
                SAFE_OPTIONS.find(
                  (option) => option.value === heavyObjects.items.safe.type
                )?.label || UNKNOW
              }
            />
            <EstimateSummaryInformationBlock
              label="Etages"
              content={heavyObjects.items.safe.floors}
            />
          </>
        ) : null}
        {heavyObjects?.items?.poolTable?.present ? (
          <>
            <EstimateSummaryInformationBlock
              label="Type de billard"
              content={
                POOL_TABLE_OPTIONS.find(
                  (option) => option.value === heavyObjects.items.poolTable.type
                )?.label || UNKNOW
              }
            />
            <EstimateSummaryInformationBlock
              label="Etages"
              content={heavyObjects.items.poolTable.floors}
            />
          </>
        ) : null}
        {heavyObjects?.items?.other?.present ? (
          <>
            <EstimateSummaryInformationBlock
              label="Autres"
              content={heavyObjects?.items?.other?.item?.value}
            />
            <EstimateSummaryInformationBlock
              label="Etages"
              content={heavyObjects.items.other.floors}
            />
          </>
        ) : null}
      </section>
      <Divider />
      {mountingType && mountingType !== "no" ? (
        <section style={{ paddingTop: "1em", paddingBottom: "1em" }}>
          <h3>
            {
              mountingHelpNeededOptions.find(
                (type) => type.value === mountingType
              ).label
            }
          </h3>
          <section style={{ padding: "0.5em" }}>
            <EstimateSummaryInformationBlock
              label="Simples"
              content={items?.simple?.count || UNKNOW}
            />
            <EstimateSummaryInformationBlock
              label="Moyens"
              content={items?.medium?.count || UNKNOW}
            />
            <EstimateSummaryInformationBlock
              label="Difficiles"
              content={items?.hard?.count || UNKNOW}
            />
          </section>
        </section>
      ) : null}
      <Divider />
      {extraFurnituresNeeded ? (
        <section style={{ paddingTop: "1em" }}>
          <EstimateSection title={messages.sections.inventory.extraFurnitures}>
            {standardItems?.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                  padding: "0.5em",
                }}
              >
                <h3>Non-Fragile :</h3>
                <Divider />
                <EstimateSummaryItemList itemList={standardItems} />
              </div>
            ) : null}
            {fragileItems?.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                  padding: "0.5em",
                }}
              >
                <h3>Fragile :</h3>
                <Divider />
                <EstimateSummaryItemList itemList={fragileItems} />
              </div>
            ) : null}
            {othersItems?.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                  padding: "0.5em",
                }}
              >
                <h3>Autres :</h3>
                <Divider />
                <EstimateSummaryItemList itemList={othersItems} />
              </div>
            ) : null}
          </EstimateSection>
        </section>
      ) : null}
      <Divider />
      <section
        style={{
          paddingTop: "2em",
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Total</h3>
        <span>
          {totalPrice.toFixed(2)}
          {CURRENCY.EUR}
        </span>
      </section>
    </EstimateSection>
  );
};

export default SummaryInventorySection;
