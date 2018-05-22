import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Save, Close, Delete, Menu } from '@material-ui/icons';
import { Paper, TextField, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core/';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
    ITemplate,
    IDataForEditTemplate,
    IDataForCreateTemplate,
    IDataForDeleteTemplates
} from './models';

import { create, edit, remove } from 'src/renderer/component/Templates/flux/module';
import { Fab } from 'src/renderer/common/Fab';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    offset: {
        display: 'inline-block',
        margin: 20
    }
  };

export namespace TemplateEditorSpace {
    
    export interface IProps {
        edit?:         (data: IDataForEditTemplate) => void;
        create?:       (data: IDataForCreateTemplate) => void;
        remove?:       (data: IDataForDeleteTemplates) => void;
        classes:       any;
        template:      ITemplate|null;
        closeTemplate: () => void;
    }
    export interface IState {
        isEdit:      boolean;
        title:       string;
        content:     any;
        description: string;
    }
}

const mapStateToProps = (state: IGlobalState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    edit: (data: IDataForEditTemplate) => dispatch(edit(data)),
    create: (data: IDataForCreateTemplate) => dispatch(create(data)),
    remove: (data: IDataForDeleteTemplates) => dispatch(remove(data))
});

@(connect(mapStateToProps, mapDispatchToProps))
class TemplateEditor extends React.Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {

  constructor(props: TemplateEditorSpace.IProps, context?: object) {
    super(props, context);

    if (this.props.template !== null) {
        const contentBlock = htmlToDraft(this.props.template.body);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                isEdit: true,
                title: this.props.template.title,
                content: editorState,
                description: this.props.template.description
            };
        } else {
            this.state = {
                isEdit: true,
                title: this.props.template.title,
                content: EditorState.createEmpty(),
                description: this.props.template.description
            };
        }
    } else {
        this.state = {
            isEdit: false,
            title: '',
            content: EditorState.createEmpty(),
            description: ''
        }
    }
  }

  onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({title: event.target.value});
  }

  onChangeContent = (newHTML: string) => {
    this.setState({content: newHTML});
  }

  onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({description: event.target.value});
  }

  render() {
    const { classes } = this.props;
    const save = () => {
        const body = draftToHtml(convertToRaw(this.state.content.getCurrentContent()))
        if (this.state.isEdit) {
            // change
            this.props.edit({
                id: this.props.template.id,
                title: this.state.title,
                body,
                description: this.state.description
            })
        } else {
            // save
            this.props.create({
                title: this.state.title,
                body,
                description: this.state.description
            });
            this.props.closeTemplate();
        }
    };

    const remove = () => {
        this.props.remove({id: [this.props.template.id]})
        this.props.closeTemplate();
    }

    return (
      <div style={{ height: '100%' }} className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Close" onClick={this.props.closeTemplate}>
                    <Close />
                </IconButton>
                <Typography className={classes.flex} variant="title" color="inherit">
                    {
                        this.state.isEdit ? 'Edit template' : 'Create template'
                    }
                </Typography>
                {
                    this.state.isEdit &&
                    <IconButton color="inherit" aria-label="Delete" onClick={remove}>
                        <Delete />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
        <Paper elevation={4}>
            <div className={classes.offset}>
                <TextField
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    label='Title template'
                    margin="normal"
                />
            </div>
            <div className={classes.offset}>
                <TextField
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    label='Description template'
                    margin="normal"
                />
            </div>
            <div className={classes.offset}>   
                <Editor
                    editorState={this.state.content}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onChangeContent}
                />
            </div>
        </Paper>
        <div>
          <Fab className='fab fab_1' onClick={save} icon={<Save/>}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TemplateEditor);
