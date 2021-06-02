import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Marker from '../../components/Marker';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledMarker = styled(Marker)`
  margin-left: 0px;
`;

const AddressContainer = styled.div`
  border: 1px solid grey;
  padding: 10px;
  border-radius: 5px;
  width: 275px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 32px;
  text-align: center;
  flex: none;
  cursor: pointer;
`;

const StyledAddIcon = styled(AddIcon)`
  color: green;
`;
const StyledClearIcon = styled(ClearIcon)`
  color: red;
`;

const LocationItem = ({
  markerText,
  backgroundColor,
  address,
  placeholder,
  editItem,
  allowDelete,
  allowAdd,
  deleteItem,
  addItem,
}) => (
  <Container>
    <StyledMarker
      text={markerText}
      backgroundColor={backgroundColor}
    />
    <AddressContainer onClick={editItem}>
      {address !== null ? address : placeholder}
    </AddressContainer>
    <ButtonContainer>
      {allowDelete && <StyledClearIcon onClick={deleteItem} />}
      {allowAdd && <StyledAddIcon onClick={addItem} />}
    </ButtonContainer>
  </Container>
);

export default LocationItem;

LocationItem.propTypes = {
  markerText: PropTypes.string,
  address: PropTypes.string,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  editItem: PropTypes.func.isRequired,
  allowDelete: PropTypes.bool,
  allowAdd: PropTypes.bool,
  deleteItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

LocationItem.defaultProps = {
  markerText: '',
  address: '',
  placeholder: '',
  backgroundColor: 'grey',
  allowDelete: false,
  allowAdd: false,
};
