import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocationItem from './locationItem';
import { PICKUP_ADDRESS_INDEX } from './useDispatchData';

const StyledCard = styled(Card)`
  width: 400px;
`;

const Locations = ({
  locations,
  setEditData,
  deleteItem,
  className,
}) => (
  <StyledCard className={className}>
    <CardContent>
      {locations.map((location, index) => (
        <LocationItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          markerText={String.fromCharCode(65 + index)}
          address={location.address}
          placeholder={
            index === PICKUP_ADDRESS_INDEX
              ? 'Set pick up location'
              : 'Set drop off location'
          }
          backgroundColor={
            index === PICKUP_ADDRESS_INDEX ? 'green' : 'blue'
          }
          editItem={() => setEditData({ doEdit: true, index })}
          allowDelete={
            index > 0 &&
            locations.length > 2 &&
            location.address !== null
          }
          allowAdd={
            index > 0 &&
            location.address !== null &&
            index === locations.length - 1
          }
          deleteItem={() => deleteItem(index)}
          addItem={() => setEditData({ doEdit: true, index: -1 })}
        />
      ))}
    </CardContent>
  </StyledCard>
);

export default Locations;

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  setEditData: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Locations.defaultProps = { locations: [], className: '' };
