import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core/';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

import { FormContext, IFormContext } from 'src/renderer/common/Validation/FormValidation';
import { useOrDefault } from 'src/renderer/utils';

export namespace TextValidatorSpace {
  export interface IState {
    value: string;
    id: string;
  }

  export interface IProps {
  }
}

export class TextValidator extends Component<TextValidatorSpace.IProps & TextFieldProps, TextValidatorSpace.IState> {

  state = { value: this.props.value as any, id: '' };

  static getDerivedStateFromProps(
    nextProps: TextValidatorSpace.IProps & TextFieldProps,
    prevState: TextValidatorSpace.IState): TextValidatorSpace.IState {
    const { id } = nextProps;
    if (id !== prevState.id) {
      return {
        value: '',
        id,
      };
    }
    return null;
  }

  onChange = (context) => (event: ChangeEvent<HTMLInputElement>) => {
    context.onSetValue(this.props.id, event.target.value);
  }

  render() {
    const { id, ...otherProps } = this.props;

    return (
      <FormContext.Consumer>
        {(context: IFormContext) => {
          const errorMessage = useOrDefault(() => (context.errors[id][0]), '');
          const showError = !!errorMessage && context.activeField[id];

          return (
            <TextField
              error={showError}
              helperText={showError && errorMessage}
              onChange={this.onChange(context)}
              value={context.values[id] || ''}
              autoComplete='off'
              {...otherProps}
            />
          );
        }}
      </FormContext.Consumer>
    );
  }
}
