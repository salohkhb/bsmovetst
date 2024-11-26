
import MUISwitch from '@mui/material/Switch';

import styles from './index.module.css';

const Switch = ({
  onChange = () => {}, checked = false, name = 'switch_action',
}) => (
  <MUISwitch
    color='default'
    classes={{ checked: styles.switch_checked, track: styles.switch_track }}
    onChange={onChange}
    checked={checked}
    name={name}
  />
)

export default Switch;
