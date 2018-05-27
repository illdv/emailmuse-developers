import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core/';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { useOrDefault } from 'src/renderer/utils';
import { IValidationActions, IValidationState } from 'src/renderer/common/Validation/flux/models';
import { ValidationActions } from 'src/renderer/common/Validation/flux/module';

export namespace TextValidatorSpace {
  export interface IState {
    value: string;
    id: string;
  }

  export interface IProps {
    actions?: IValidationActions;
    validation?: IValidationState;
    schema: object;
    inputRef?: (ref) => void;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...ValidationActions,
  }, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
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

  componentDidMount(): void {
    const { actions, id, schema } = this.props;
    if (!schema[id]) {
      throw new Error(`Not exist validation schema for TextValidator id = ${id}`);
    }
    actions.setScheme({ key: id, value: schema[id] });
  }

  onBlur = (value: any) => () => {
    const { actions, id } = this.props;
    actions.setValue({ key: id, value });
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { validation, inputRef, id, ...otherProps } = this.props;
    const { isWasBlur, result }                       = validation;

    const error = isWasBlur[id] && useOrDefault(() => (result[id][0]), '');

    return (
      <TextField
        error={!!error}
        helperText={error}
        inputRef={inputRef}
        onBlur={this.onBlur(this.state.value)}
        onChange={this.onChange}
        value={this.state.value}
        autoComplete='off'
        {...otherProps}
      />
    );
  }
}
