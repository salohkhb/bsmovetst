import Select from "../Select";
import { any, string } from "prop-types";
import { FLOOR_SELECT_OPTIONS } from "./options";

const FloorSelect = ({ label, name, onChange, value, variant = null, disabled = false }) => (
  <Select
    label={label}
    name={name}
    onChange={onChange}
    value={value}
    options={FLOOR_SELECT_OPTIONS}
    variant={variant}
    disabled={disabled}
  />
);

FloorSelect.propTypes = {
  label: string,
  name: string,
  onChange: any,
  value: any,
  variant: string || null,
};

export default FloorSelect;
