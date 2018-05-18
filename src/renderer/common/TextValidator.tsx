import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core/';
import { Component } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

export namespace TextValidatorSpace {
  export interface IState {
  }

  export interface IProps {
    validationError: string;
  }
}

export class TextValidator extends Component<TextValidatorSpace.IProps & TextFieldProps, TextValidatorSpace.IState> {

  state = { isBeBlur: false };

  onBlur = () => {
    this.setState({ isBeBlur: true });
  }

  render() {
    const {validationError,  ...otherProps } = this.props;

    if(validationError && this.state.isBeBlur){
      return (
        <TextField error helperText={validationError} {...otherProps} />
      );
    }

    return (
      <TextField onBlur={this.onBlur} {...otherProps} />
    );
  }
}
