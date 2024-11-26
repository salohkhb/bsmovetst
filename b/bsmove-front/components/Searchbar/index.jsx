import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import defaultMessages from './messages';
import styles from './index.module.css';
import { IconButton } from '@mui/material';

const Searchbar = ({
  messages = defaultMessages, handleChange = () => {},
  withGrowMenu = false, handleOpen = () => {}, setAnchorEl = () => {},
  containerId = 'searchbar'
}) => {
  const [input, setInput] = useState('');

  async function onChange(e) {
    setInput(e.target.value);
  }

  function clearInput() {
    setInput('');
  }

  useEffect(() => {
    if (withGrowMenu) {
      handleOpen(!!input?.length)
    }
    handleChange(input);
  }, [input]);

  return (
    <div className={styles.searchbar_container} id={containerId}>
      <SearchIcon />
      <input
        value={input}
        onChange={onChange}
        className={styles.searchbar_input}
        placeholder={messages.placeholder}
      />
      {
        input
          ? (
            <IconButton
              color='inherit'
              edge='end'
              className={styles.searchbar_clear_button}
              onClick={clearInput}
              size="large">
              <ClearIcon fontSize='small' />
            </IconButton>
        ) : null
      }
    </div>
  );
};

export default Searchbar;
