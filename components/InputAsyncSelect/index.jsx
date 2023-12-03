// import {debounce} from "lodash";
// import styles from "../../containers/Estimate/Details/index.module.css";
// import messages from "../../containers/Estimate/Details/messages";
// import AsyncSelect from "react-select/async";
// import {useEffect, useRef, useState} from "react";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Input from "../Input";
// import placeholder from "lodash/fp/placeholder";
//
// export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
//
// function mapPlaceApiToData(result) {
//   if (!result) return
//   const mapped = result?.map((item) => ({
//     value: item?.display_name.toLowerCase(),
//     label: item?.display_name,
//     placeName: item?.display_name || "",
//     lng: Number(item?.lon) || 0,
//     lat: Number(item?.lat) || 0,
//     country: item?.address?.country || "",
//     shortenedAddress:
//         `${item?.address?.house_number || ''} ${item?.address?.road}, ${item?.address?.postcode}, ${item?.address?.municipality}, ${item?.address?.country}`,
//   }));
//   return mapped;
// }
//
// export const InputAsyncSelect = ({
//   initialValue = '',
//   name,
//   placeholder,
//   onChange,
// }) => {
//   const [options, setOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState(initialValue);
//   const [menuPortalTarget, setMenuPortalTarget] = useState(null);
//   const [selected, setSelected] = useState(null);
//
//   async function fetchAddresses(address) {
//     if (address) {
//       const requestOptions = {
//         method: "GET",
//         redirect: "follow",
//       };
//       const localizationResult = await fetch(
//           `${NOMINATIM_BASE_URL}q=${address}&countryCode=fr&format=json&addressdetails=1`
//           ,
//         requestOptions
//       );
//       const result = await localizationResult.text();
//       const mappedResult = mapPlaceApiToData(JSON.parse(result));
//       setOptions(mappedResult)
//       return mappedResult;
//     }
//   }
//
//   useEffect(() => {
//     const fetchOptions = debounce(async (inputValue) => {
//       setIsLoading(true);
//       const res = await fetchAddresses(inputValue.toLowerCase());
//       console.log('result of search : ', res)
//       setIsLoading(false);
//       setOptions(res)
//     }, 500)
//
//     if (inputValue?.length > 2) {
//       fetchOptions(inputValue);
//     }
//     return () => {
//       // Cleanup the debounce function
//       fetchOptions.cancel();
//     };
//   }, [inputValue]);
//
//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     setInputValue(newValue);
//   };
//
//   return (
//     <>
//       <Autocomplete
//           disablePortal
//           autoComplete
//           includeInputInList
//           id={`${name}-address-input`}
//           options={options}
//           value={inputValue}
//           loading={isLoading}
//           sx={{ width: '100%' }}
//           renderInput={
//             (params) =>
//                 <TextField {...params} value={inputValue} onChange={handleChange} label={placeholder} />}
//       />
//     </>
//   );
// };
//
// export default InputAsyncSelect;

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

// Use your own Nominatim API endpoint and key
const NOMINATIM_API_ENDPOINT = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_API_KEY = process.env.NEXT_PUBLIC_OPEN_ROUTE_SERVICE_KEY;

function getPlacePredictions(input, callback) {
  const url = new URL(NOMINATIM_API_ENDPOINT);
  url.searchParams.append('q', input);
  url.searchParams.append('format', 'json');
  url.searchParams.append('limit', 5);
  url.searchParams.append('key', NOMINATIM_API_KEY);

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const predictions = data.map((place) => ({
            ...place,
            description: place.display_name,
        }));
        callback(predictions);
      })
      .catch((error) => {
        console.error('Error fetching place predictions', error);
        callback([]);
      });
}

function mapPlaceApiToData(item) {
  if (!item) return
    const mapped = {
        value: item?.display_name.toLowerCase(),
        label: item?.display_name,
        placeName: item?.display_name || "",
        lng: Number(item?.lon) || 0,
        lat: Number(item?.lat) || 0,
        country: item?.address?.country || "",
        shortenedAddress:
            `${item?.address?.house_number || ''} ${item?.address?.road}, ${item?.address?.postcode}, ${item?.address?.municipality}, ${item?.address?.country}`,
        }
  return mapped;
}

const OpenStreetMapAutocomplete = ({
   name,
   isDisabled = false,
   onSelect,
   placeholder,
   initialInputValue,
   label,
}) => {
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState(initialInputValue || '');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  React.useEffect(() => {
      setInputValue(initialInputValue || '')
  }, [initialInputValue])

  const fetch = React.useMemo(
      () =>
          debounce((request, callback) => {
            getPlacePredictions(request.input, callback);
          }, 400),
      []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  function onChange(event, newValue) {
      setOptions(newValue ? [newValue, ...options] : options);
      setValue(newValue);
      setInputValue(newValue ? newValue.description : '');
      onSelect(mapPlaceApiToData(newValue))
  }

  return (
      <Autocomplete
          id="geolocation-input"
          fullWidth
          getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          disabled={isDisabled}
          defaultValue={initialInputValue}
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="Aucun résultat trouvé"
          onChange={onChange}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
              <TextField {...params} value={inputValue} label={label || placeholder} placeholder={placeholder} fullWidth />
          )}
          renderOption={(props, option) => {
            const parts = parse(option.description, []);

            return (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: 'flex', width: 44 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </Grid>
                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                      {parts.map((part, index) => (
                          <Box
                              key={index}
                              component="span"
                              sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                          >
                            {part.text}
                          </Box>
                      ))}
                    </Grid>
                  </Grid>
                </li>
            );
          }}
      />
  );
}

export default OpenStreetMapAutocomplete
