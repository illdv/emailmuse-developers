import * as React from 'react';
import { Component } from 'react';
import * as validate from 'validate.js';

export interface IFormContext {
  onSubmit: () => void;
  onSetValue: (fieldId: string, newValue: string) => void;
  errors: object;
  values: object;
  activeField: object;
}

export const FormContext = React.createContext({});

export namespace FormValidationSpace {
  export interface IState {
    values: { [key: string]: string; };
    activeField: { [key: string]: boolean; };
    errors: object;
  }

  export interface IProps {
    onValidationSuccessful: (value) => void;
    schema: object;
    formId: string;
  }
}

export class FormValidation extends Component<FormValidationSpace.IProps, FormValidationSpace.IState> {

  state = { values: {}, activeField: {}, errors: {} };

  onSubmit = () => {
    const { values } = this.state;
    const { schema } = this.props;

    const activeField = {};
    Object.keys(schema).forEach((key) => activeField[key] = true);
    const errors = validate(values, schema);

    if (errors === undefined) {
      this.props.onValidationSuccessful(values);
      return;
    } else {
      this.setState({
        errors,
        activeField,
      });
    }
  }

  onSetValue = (fieldId: string, newValue: string) => {

    const values = {
      ...this.state.values,
      [fieldId]: newValue,
    };

    const errors = validate(values, this.props.schema);

    this.setState({
      errors,
      values,
      activeField: {
        ...this.state.activeField,
        [fieldId]: true,
      },
    });
  }

  render() {
    const { onSubmit, onSetValue }        = this;
    const { values, activeField, errors } = this.state;

    const context: IFormContext = { onSubmit, onSetValue, errors, values, activeField };
    return (
      <FormContext.Provider value={context}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}
