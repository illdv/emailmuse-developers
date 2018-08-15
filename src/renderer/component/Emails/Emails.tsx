import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Fade, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { Add, Close, CreateNewFolder } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { emailToEditEntity, nodeToItem } from 'src/renderer/component/Emails/utils';
import { Fab } from 'src/renderer/common/Fab';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { EmailActions } from 'src/renderer/component/Emails/flux/module';
import { IEmailActions, IEmailsState } from 'src/renderer/component/Emails/flux/interface';
import { ActionStatus } from 'src/renderer/flux/interface';
import { IColumn } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { folderActions, IFolderActions } from 'src/renderer/component/Folder/flux/actions';
import { NodeTableList } from 'src/renderer/component/Emails/NodeList/NodeTableList';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';
import { Search } from 'src/renderer/common/Search';

export enum nodeType {
  email = 'email',
  folder = ' folder',
}

export namespace EmailListSpace {
  export interface IProps {
    emails: IEmailsState;
    folders: IFolder[];
    emailsActions: IEmailActions;
    foldersActions: IFolderActions;
    editorActions: IEditorActions;
    history: any;
    location: any;
  }

  export interface IState {
    newEmail: IEmail;
    currentFolder: IFolder;
    searchWorld: string;
  }
}

export class Emails extends React.Component<EmailListSpace.IProps, EmailListSpace.IState> {
  state: EmailListSpace.IState = {
    newEmail: null,
    searchWorld: '',
    currentFolder: null,
  };

  static getDerivedStateFromProps(props, prevState) {
    const { match } = props;
    const newState = prevState;
    if (match.params.id) {
      newState.currentFolder = {
        name: match.params.name,
        id: match.params.id,
      };
    } else {
      newState.currentFolder = { name: null, id: null };
    }
    return newState;
  }

  onChangePage = (e, page: number) => {
    this.props.emailsActions.loading({});
  }

  selectNode = (node: { item: any, type }) => {
    const { item, type } = node;
    if (type === nodeType.folder) {
      const parentId = Number(item.id);
      this.setState({ currentFolder: item });
      this.props.foldersActions.openFolder.REQUEST({ folder: item });
      this.props.emailsActions.getEmailFromFolder({ parentId });
    } else {
      this.props.editorActions.edit.REQUEST(emailToEditEntity(item));
    }
  }

  onSelectNewTemplate = () => {
    this.props.emailsActions.selectNewTemplate({ parentId: this.state.currentFolder.id });
  }

  onCreateNewFolder = () => {
    this.props.foldersActions.showModal.REQUEST({ parentId: this.state.currentFolder.id });
  }

  onUpdateEmail = (data: { id: number, folder_id: number }) => {
    this.props.emailsActions.save({ email: data } as any);
  }

  onDeleteFolder = (id: number) => {
    this.props.foldersActions.deleteFolder.REQUEST({ ids: [id] });
  }

  onCopy = (id: string) => {
    this.props.emailsActions.copy({ id });
  }

  // ToDo fix me
  onSearch = (searchWorld: string) => {
    this.props.emailsActions.loading({ s: searchWorld });
    this.setState({ searchWorld });
  }

  setCurrentParentId = (id: number) => {
    this.setState({ currentFolder: { ...this.state.currentFolder, id } });
  }

  onOpenRootFolder = () => {
    this.setState({ currentFolder: null });
    this.props.foldersActions.openFolder.REQUEST({});
  }

  render() {
    let { emails } = this.props.emails;
    const { status } = this.props.emails;
    const folders: IFolder[] = this.props.folders;
    const { searchWorld, currentFolder } = this.state;
    if (status === ActionStatus.FAILURE) {
      return (
        <Typography variant='headline' noWrap align='center'>
          Sorry but we couldn't download the emails.
        </Typography>
      );
    }

    const columnData: IColumn[] = [
      { id: '1', label: 'Subject', disablePadding: false, numeric: false },
      { id: '2', label: 'Description', disablePadding: false, numeric: false },
      { id: '3', label: 'Last update', disablePadding: false, numeric: false },
    ];

    if (currentFolder && currentFolder.id === null && searchWorld === '') {
      emails = emails.filter(email => email.folder_id === null);
    }

    return (
      <div>
        <Fade in timeout={1000}>
          <Paper>
            <Grid item xs={12}>
              <Grid
                container
                spacing={16}
                alignItems={'center'}
                justify={'space-between'}
                style={{ marginTop: 0 }}
              >
                <Grid item>
                  <Toolbar>
                    <Typography
                      color='inherit'
                      variant='subheading'
                      onClick={this.onOpenRootFolder}
                      style={{ cursor: 'pointer' }}
                    >Emails
                    </Typography>
                    {
                      currentFolder && currentFolder.name ?
                        <>
                          <span style={{ padding: '0 5px 0 5px' }}> / </span>
                          <Typography
                            color='inherit'
                            variant='subheading'
                          >
                            {currentFolder.name}
                          </Typography>
                        </>
                        : null
                    }
                  </Toolbar>
                </Grid>
                <Grid style={{ paddingRight: 15 }} item>
                  <Search search={this.onSearch}/>
                </Grid>
              </Grid>
            </Grid>
            <NodeTableList
              emails={emails}
              folders={folders}
              toItem={nodeToItem}
              onOpenItem={this.selectNode}
              onUpdateEmail={this.onUpdateEmail}
              onChangePage={this.onChangePage}
              onCopy={this.onCopy}
              isLoading={status === ActionStatus.REQUEST}
              columnData={columnData}
              onCurrentParentId={this.setCurrentParentId}
              onDeleteFolder={this.onDeleteFolder}
            />
            {
              (currentFolder && currentFolder.id === null) ?
                <Fab
                  onClick={this.onCreateNewFolder}
                  icon={<CreateNewFolder/>}
                  position={1}
                  title={'Add a folder'}
                  whitCtrl
                  hotKey={'F'}
                />
                :
                null

            }
            {
              (currentFolder && currentFolder.id !== null) ?
                <Fab
                  onClick={this.onOpenRootFolder}
                  icon={<Close/>}
                  position={1}
                  title={'Close'}
                />
                :
                null
            }
            <Fab
              onClick={this.onSelectNewTemplate}
              icon={<Add/>}
              position={0}
              title={'Add a new email'}
              whitCtrl
              hotKey={'A'}
            />
          </Paper>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  emails: state.emails,
  folders: state.folders.folders,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  emailsActions: bindActionCreators(EmailActions, dispatch),
  foldersActions: bindModuleAction(folderActions, dispatch),
  editorActions: bindModuleAction(EditorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
