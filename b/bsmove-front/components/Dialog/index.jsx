import { bool, func, node } from 'prop-types';
import MUIDialog from '@mui/material/Dialog';

const Dialog = ({ open, handleClose, children }) => {
  return (
    <div>
      <MUIDialog
        open={open}
        handleClose={handleClose}
      >
        {children}
      </MUIDialog>
    </div>
  )
};

Dialog.propTypes = {
  open: bool.isRequired,
  handleClose: func.isRequired,
  children: node.isRequired,
};

export default Dialog;

