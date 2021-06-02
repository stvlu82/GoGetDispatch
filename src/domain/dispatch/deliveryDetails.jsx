import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export const DETAIL_TYPE_DESCRIPTION = 'description';
export const DETAIL_TYPE_CUSTOM_NOTE = 'customNote';
export const DETAIL_TYPE_VEHICLE = 'vehicle';

export const VEHICLE_TYPE_BICYCLE = 'Bicycle';
export const VEHICLE_TYPE_CAR = 'Car';

const StyledCard = styled(Card)`
  width: 400px;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

const ItemContainer = styled.div`
  border: 1px solid grey;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled(ItemContainer)`
  cursor: pointer;
`;

const DeliveryDetails = ({
  description,
  note,
  vehicle,
  distanceData,
  fee,
  className,
  setEditData,
  createDispatch,
}) => (
  <StyledCard className={className}>
    <CardContent>
      <ButtonContainer
        onClick={() =>
          setEditData({ doEdit: true, type: DETAIL_TYPE_DESCRIPTION })
        }
      >
        {description !== null ? description : 'Add item description'}
      </ButtonContainer>
      <ButtonContainer
        onClick={() =>
          setEditData({ doEdit: true, type: DETAIL_TYPE_CUSTOM_NOTE })
        }
      >
        {note !== null ? note : 'Add custom note'}
      </ButtonContainer>
      <ButtonContainer
        onClick={() =>
          setEditData({ doEdit: true, type: DETAIL_TYPE_VEHICLE })
        }
      >
        {vehicle}
      </ButtonContainer>
      <ItemContainer>
        {distanceData.hasError && 'Error'}
        {distanceData.isCalculating && 'Calculating...'}
        {!distanceData.hasError &&
          !distanceData.isCalculating &&
          `${distanceData.distance.toFixed(1)} km`}
      </ItemContainer>
      <ItemContainer>{`RM ${fee.toFixed(2)}`}</ItemContainer>
    </CardContent>
    <StyledCardActions>
      <Button size="small" onClick={createDispatch}>
        Create
      </Button>
    </StyledCardActions>
  </StyledCard>
);

export default DeliveryDetails;

DeliveryDetails.propTypes = {
  description: PropTypes.string,
  note: PropTypes.string,
  vehicle: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  distanceData: PropTypes.object,
  fee: PropTypes.number,
  className: PropTypes.string,
  setEditData: PropTypes.func.isRequired,
  createDispatch: PropTypes.func.isRequired,
};

DeliveryDetails.defaultProps = {
  description: '',
  note: '',
  vehicle: '',
  distanceData: { distance: 0 },
  fee: 0,
  className: '',
};
