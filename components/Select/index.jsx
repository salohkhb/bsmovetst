import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import styles from "./index.module.css";
import { any, number, string } from "prop-types";

const Select = ({
  label = "select",
  name = "select",
  value,
  onChange,
  options = [],
  variant = "filled",
    disabled = false,
}) => (
  <FormControl
    variant={variant}
    className={styles.select_form_control_container}
  >
    <InputLabel htmlFor={`filled-${label}-native-simple`}>{label}</InputLabel>
    <MUISelect
        disabled={disabled}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      onChange={onChange}
      inputProps={{
        id: `filled-${label}-native-simple`,
        name,
        className: styles.select_input_root,
      }}
    >
      <MenuItem key="defaultOption" value={undefined} />
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  </FormControl>
);

Select.propTypes = {
  label: string,
  name: string,
  value: string | number,
  onChange: any,
  options: any,
  variant: string || null,
};

export default Select;
