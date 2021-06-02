import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  line-height: 24px;
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  color: white;
  margin: 8px;
  flex: 0 0 auto;
`;

const Marker = ({ text, backgroundColor, className }) => (
  <StyledDiv backgroundColor={backgroundColor} className={className}>
    {text}
  </StyledDiv>
);

export default Marker;

Marker.propTypes = {
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

Marker.defaultProps = {
  text: '',
  backgroundColor: 'grey',
  className: '',
};
