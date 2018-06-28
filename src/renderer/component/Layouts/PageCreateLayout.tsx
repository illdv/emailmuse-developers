import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Loading } from 'src/renderer/common/Loading';
import { createEmptyTemplate, templateToItem } from 'src/renderer/component/Templates/utils';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { bindModuleAction, useOrDefault } from 'src/renderer/utils';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { ITemplateAction, ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { ElementList } from 'src/renderer/common/List/ElementList';
import { ILayoutActions } from 'src/renderer/component/Layouts/flux/interface';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';

export namespace PageCreateLayoutSpace {
  export interface IProps {
    isOpen?: boolean;
    templates?: ITemplateState;
    action?: ITemplateAction;
    actionLayout?: ILayoutActions;
    onShowToast?: (messages: string, type: ToastType) => void;
    handleClose?: () => void;
  }

  export interface IState {
    newTemplate: ITemplate;
    open: boolean;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  templates: state.templates,
});

// TODO: Use createActions!
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actionLayout: bindModuleAction(LayoutActions, dispatch),
  action: bindActionCreators(TemplateAction, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

export class PageCreateLayout extends React.Component<PageCreateLayoutSpace.IProps, PageCreateLayoutSpace.IState> {

  state: PageCreateLayoutSpace.IState = {
    newTemplate: null,
    open: false,
  }

  componentDidMount() {
    const page = useOrDefault(() => (this.props.templates.pagination.current_page), 1);
    this.props.action.loading({ page });
  }

  selectTemplate = (template: ITemplate) => () => {
    this.props.actionLayout.create.REQUEST({layout: {title: template.title, body: template.body}});
  }

  // TODO: for validation use TextValidator
  private validation = (template: ITemplate): boolean => {
    if (!template.body && template.body.length === 0) {
      this.props.onShowToast(`Body can't be empty`, ToastType.Warning);
      return false;
    }
    if (!template.title && template.title.length === 0) {
      this.props.onShowToast(`Subject can't be empty`, ToastType.Warning);
      return false;
    }
    return true;
  }

  onChangePage = (e, page: number) => {
    this.props.action.loading({ page: page + 1 });
  }

  onSelectNewTemplate = () => {
    this.props.action.select(createEmptyTemplate());
  }

  onSaveOrCreate = (newTemplate: ITemplate, saveAndClose: boolean = false) => {
    if (!this.validation(newTemplate)) {
      return;
    }

    const { templates, action } = this.props;

    if (templates.selectedTemplate.id) {
      action.save({ template: newTemplate, saveAndClose });
    } else {
      action.create(newTemplate);
    }
  }

  onCloseOrRemove = () => {
    const { templates, action } = this.props;

    const id = templates.selectedTemplate.id;

    if (id) {
      action.remove(id);
    } else {
      action.select(null);
    }
  }

  onClose = () => {
    this.props.action.select(null);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.props.handleClose();
  }
  render() {
    const { status, templates, pagination, selectedTemplate } = this.props.templates;

    if (status === ActionStatus.REQUEST) {
      return <Loading/>;
    }

    if (status === ActionStatus.FAILURE) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the templates.
        </Typography>
      );
    }

    if (selectedTemplate) {
      // return (
      //   // console.log('you select ', selectedTemplate)
      // );
    }

    return (
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Which email would you like to use as a layout template?</DialogTitle>
          <DialogContent>
              <ElementList
                entities={templates}
                toItem={templateToItem}
                onOpenItem={this.selectTemplate}
                pagination={pagination}
                onChangePage={this.onChangePage}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageCreateLayout);
