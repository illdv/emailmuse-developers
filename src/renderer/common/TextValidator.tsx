import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core/';
import { Component } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { validate } from 'validate.js';

export namespace TextValidatorSpace {
  export interface IState {
    isBeBlur: boolean;
  }

  export interface IProps {
    validations: object;
    onError: (error: string, fieldId: string) => void;
  }
}

export class TextValidator extends Component<TextValidatorSpace.IProps & TextFieldProps, TextValidatorSpace.IState> {

  state = { isBeBlur: false };

  onBlur = () => {
    this.setState({ isBeBlur: true });
  }

  render() {
    const { validations, value, onError, ...otherProps } = this.props;

    const constraints = { value: validations };

    const error: { value: string[] } = validate({ value }, constraints);
    console.log(error);

    if (error && this.state.isBeBlur) {
      onError(error.value[0], otherProps.id);
      return (
        <TextField {...otherProps} error helperText={error.value[0]}/>
      );
    }

    return (
      <TextField onBlur={this.onBlur} {...otherProps} />
    );
  }
}
