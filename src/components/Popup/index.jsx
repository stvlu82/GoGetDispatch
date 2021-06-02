import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const Popup = ({ onClose, text, open, className }) => (
  <Dialog onClose={onClose} open={open} className={className}>
    <DialogTitle>{text}</DialogTitle>
  </Dialog>
);

export default Popup;

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

Popup.defaultProps = { text: '', className: '' };
