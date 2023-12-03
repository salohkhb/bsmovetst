import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import messages from "./messages";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
const S = {};

S.DatePicker = styled(DatePicker)`
  width: 100%;
`;

const DateInput = ({ value, handleChange, fullWidth = false, error }) => {
  const today = new Date();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
      <S.DatePicker
        placeholder="jj/mm/aaaa"
        minDate={today}
        disablePast
        maxDate={maxDate}
        autoOk
        value={value}
        format="dd/MM/yyyy"
        invalidDateMessage={messages.invalidDateMessage}
        invalidLabel={messages.invalidDateMessage}
        minDateMessage={messages.pastDate}
        maxDateMessage={messages.futureDate}
        onChange={handleChange}
        renderInput={(props) => <TextField label="date input" {...props} />}
        fullWidth={fullWidth}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
