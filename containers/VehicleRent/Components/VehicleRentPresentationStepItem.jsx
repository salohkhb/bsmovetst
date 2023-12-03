import styles from '../index.module.css';
import {any, element, string} from 'prop-types';
import {S} from '../index';

const VehicleRentPresentationStepItem = ({ title, content, IconEl }) => (
  <div className={styles.vehicle_rent_presentation__step_icon_wrapper}>
    {IconEl ? (
      <div className={styles.vehicle_rent_presentation__step_circle}>
        <i className={styles.vehicle_rent_presentation__step_icon}>
          <IconEl sx={{ fontSize: "50px" }} />
        </i>
      </div>
    ) : null}
    <h4>{title}</h4>
    <S.Content>{content}</S.Content>
  </div>
);

VehicleRentPresentationStepItem.propTypes = {
  title: string,
  content: any,
  IconEl: element
}

export default VehicleRentPresentationStepItem;