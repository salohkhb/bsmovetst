import Image from "next/legacy/image";
import MUICard from "@mui/material/Card";
import styled from "styled-components";

import styles from "./index.module.css";

const DEFAULT_VEHICLE_IMG = "/images/vehicle.png";

const S = {};

S.Card = styled(MUICard)`
  border-radius: 12px;
`;

const VehicleCard = ({ vehicle = {}, children }) => {
  return (
    <MUICard id={vehicle.id} raised={true}>
      <div className={styles.vehicle_card_container}>
        <div className={styles.vehicle_card_img_container}>
          <Image
            quality={100}
            layout="fill"
            src={vehicle?.image || DEFAULT_VEHICLE_IMG}
            alt={`vehicle_img_${vehicle?.id}`}
          />
        </div>
        <span className={styles.vehicle_card_title}>{vehicle?.name}</span>
        {children}
      </div>
    </MUICard>
  );
};

export default VehicleCard;
