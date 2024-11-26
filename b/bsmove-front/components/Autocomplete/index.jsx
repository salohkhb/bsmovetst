import MUIAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocomplete = ({ options = [], messages: { label, placeholder, name } = {}, handleChange = () => {} }) => {
  return (
    <>
      <MUIAutocomplete
        id={name}
        fullWidth
        options={options.map(option => option?.name)}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus={false}
            label={label}
            placeholder={placeholder}
            name={name}
            margin="dense"
            variant="standard"
          />
        )}
      />
    </>
  )
}

export default Autocomplete;