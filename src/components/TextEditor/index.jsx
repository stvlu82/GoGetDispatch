import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledCard = styled(Card)`
  width: 400px;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const TextEditor = ({
  title,
  text,
  className,
  closeEditor,
  setText,
}) => {
  const [editedText, setEditedText] = useState(text);

  const handleOnDone = () => {
    setText(editedText);
    closeEditor();
  };

  const handleOnChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <StyledCard className={className}>
      <CardContent>
        <StyledTextField
          label={title}
          multiline
          rows={4}
          text={text}
          variant="outlined"
          onChange={handleOnChange}
        />
      </CardContent>
      <StyledCardActions>
        <Button size="small" onClick={handleOnDone}>
          Done
        </Button>
      </StyledCardActions>
    </StyledCard>
  );
};

export default TextEditor;

TextEditor.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  closeEditor: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  title: '',
  text: '',
  className: '',
};
