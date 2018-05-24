import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { ITemplate } from './models';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import TemplatesList from './TemplatesList';
import TemplateEditor from './TemplateEditor';

import { FAILURE, LOADING, loading } from 'src/renderer/component/Templates/flux/module';
import { getPages, getStatus } from 'src/renderer/component/Templates/flux/selectors';
import { Button } from '@material-ui/core';
import { Loading } from 'src/renderer/common/Loading';
import { TemplateEditorJodit } from 'src/renderer/component/Templates/TemplateEditorJodit'

export namespace MailListSpace {
  export interface IProps {
    status?: string;
    pages?: object;
    loading?: () => void;
  }

  export interface IState {
    activePage: number;
    editTemplate: null | ITemplate;
    createTemplate: boolean;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  status: getStatus(state),
  pages: getPages(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loading: () => dispatch(loading()),
});

@connect(null, mapDispatchToProps)

@(connect(mapStateToProps, mapDispatchToProps))
class TemplatesRouter extends React.Component<MailListSpace.IProps, MailListSpace.IState> {
  state = {
    activePage: 1,
    editTemplate: null,
    createTemplate: false,
  };

  selectTemplate = (template: ITemplate) => {
    this.setState({
      editTemplate: template,
    });
  }

  closeTemplate = () => {
    this.setState({
      editTemplate: null,
      createTemplate: false,
    });
  }

  onCreateTemplate = () => {
    this.setState({
      createTemplate: true,
    });
  }

  componentDidMount() {
    if (!this.props.pages[this.state.activePage] || this.props.status !== LOADING) {
      this.props.loading();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.pages[nextState.activePage]) {
      this.props.loading();
    }
  }

  render() {
    return <TemplateEditorJodit/>;
  }
}

export default TemplatesRouter;
