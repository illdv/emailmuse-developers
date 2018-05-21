import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { TextField } from '@material-ui/core/';
import { ChangeEvent, Component } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { bindActionCreators } from 'redux';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { useOrDefault } from 'src/renderer/utils';
import { PaperDialogSpace } from 'src/renderer/component/Auth/common/PaperDialog';

export namespace TextValidatorSpace {
  export interface IState {
    value: string;
    id: string;
  }

  export interface IProps {
    actions?: FluxValidation.Actions.IAllAction;
    validation?: FluxValidation.IState;
    schema: object;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  validation: state.validation,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...FluxValidation.Actions.AllAction,
  }, dispatch)
});

@(connect(mapStateToProps, mapDispatchToProps))
export class TextValidator extends Component<TextValidatorSpace.IProps & TextFieldProps, TextValidatorSpace.IState> {

  state = { value: this.props.value as any, id: '' };

  static getDerivedStateFromProps(nextProps: TextValidatorSpace.IProps & TextFieldProps, prevState: TextValidatorSpace.IState): TextValidatorSpace.IState {
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
    actions.setScheme({ key: id, value: schema });
  }

  onBlur = (value: any) => () => {
    const { actions, id } = this.props;
    actions.setValue({ key: id, value });
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { validation, id, ...otherProps } = this.props;
    const { isWasBlur, resultValidation }   = validation;

    const error = isWasBlur[id] && useOrDefault(() => (resultValidation[id][0]), '');

    return (
      <TextField
        error={!!error}
        helperText={error}
        onBlur={this.onBlur(this.state.value)}
        onChange={this.onChange}
        value={this.state.value}
        {...otherProps}
      />
    );
  }
}
