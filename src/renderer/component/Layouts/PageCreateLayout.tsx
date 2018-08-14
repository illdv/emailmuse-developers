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
import { nodeToItem } from 'src/renderer/component/Emails/utils';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EmailActions } from 'src/renderer/component/Emails/flux/module';
import { IEmailActions, IEmailsState } from 'src/renderer/component/Emails/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { ListTable } from 'src/renderer/common/List/ListTable/ListTable';
import { ILayoutActions } from 'src/renderer/component/Layouts/flux/interface';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { useOrDefault } from 'src/renderer/utils';

export namespace PageCreateLayoutSpace {
  export interface IProps {
    isOpen?: boolean;
    emails?: IEmailsState;
    emailsActions?: IEmailActions;
    layoutActions?: ILayoutActions;
    onShowToast?: (messages: string, type: ToastType) => void;
    handleClose?: () => void;
  }

  export interface IState {
    newTemplate: IEmail;
    open: boolean;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  emails: state.emails,
});

// TODO: Use createActions!
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  layoutActions: bindModuleAction(LayoutActions, dispatch),
  emailsActions: bindActionCreators(EmailActions, dispatch),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  },
});

export class PageCreateLayout extends React.Component<PageCreateLayoutSpace.IProps, PageCreateLayoutSpace.IState> {
  state: PageCreateLayoutSpace.IState = {
    newTemplate: null,
    open: false,
  };

  componentDidMount() {
    // const page = useOrDefault(() => (this.props.templates.pagination.current_page), 1);
    // this.props.action.loading({ page });
    this.props.emailsActions.loading({});
  }

  selectTemplate = (template: IEmail) => () => {
    this.props.layoutActions.create.REQUEST({ layout: { title: template.title, body: template.body } });
    this.props.handleClose();
  }

  onChangePage = (e, page: number) => {
    // this.props.action.loading({ page: page + 1 });
    this.props.emailsActions.loading({});

  }

  onClose = () => {
    this.props.emailsActions.select(null);
  }

  handleClose = () => {
    this.props.handleClose();
  }
  render() {
    const { status, emails, selectedEmail } = this.props.emails;

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

    if (selectedEmail) {
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
              <ListTable
                entities={emails}
                toItem={nodeToItem}
                onOpenItem={this.selectTemplate}
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
