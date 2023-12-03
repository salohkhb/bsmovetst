import styles from '../index.module.css';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import VehicleRentPresentationStepItem from './VehicleRentPresentationStepItem';

const VehicleRentPresentationSteps = () => (
  <main className={styles.vehicle_rent_presentation__steps_wrapper}>
    <VehicleRentPresentationStepItem
      title="Renseignements"
      content="Je remplis les informations concernant ma location."
      IconEl={PlaceOutlinedIcon}
    />
    <VehicleRentPresentationStepItem
      title="Choisissez un véhicule"
      content="Je choisi un véhicule disponible aux dates sélectionnés."
      IconEl={LocalShippingOutlinedIcon}
    />
    <VehicleRentPresentationStepItem
      title="Réservation"
      content="Je réserve le véhicule en remplissant un formulaire, ou en se connectant."
      IconEl={CheckOutlinedIcon}
    />
  </main>
);

export default VehicleRentPresentationSteps;
