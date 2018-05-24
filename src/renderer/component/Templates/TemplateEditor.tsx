import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Save, Close, Delete, Menu, AddToPhotos,GetApp, ContentCopy, Publish } from '@material-ui/icons';
import { Paper, TextField, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core/';
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils,Entity } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import * as draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import createImagePlugin from 'draft-js-image-plugin';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
  ITemplate,
  IDataForEditTemplate,
  IDataForCreateTemplate,
  IDataForDeleteTemplates
} from './models';

import { create, edit, remove } from 'src/renderer/component/Templates/flux/module';
import { Fab } from 'src/renderer/common/Fab';
import { DialogSelectImage } from 'src/renderer/component/Templates/DialogSelectImage';
import { TextValidator } from 'src/renderer/common/Validation/TextValidator';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

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
    edit?: (data: IDataForEditTemplate) => void;
    create?: (data: IDataForCreateTemplate) => void;
    remove?: (data: IDataForDeleteTemplates) => void;
    classes: any;
    template: ITemplate | null;
    closeTemplate: () => void;
    onShowToast?: (messages: string, type: ToastType) => void;
  }

  export interface IState {
    isEdit: boolean;
    title: string;
    content: any;
    description: string;
    selectImageOpen: boolean;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  edit: (data: IDataForEditTemplate) => dispatch(edit(data)),
  create: (data: IDataForCreateTemplate) => dispatch(create(data)),
  remove: (data: IDataForDeleteTemplates) => dispatch(remove(data)),
  onShowToast: (messages: string, type: ToastType) => {
    dispatch(FluxToast.Actions.showToast(messages, type));
  }
});

@(connect(mapStateToProps, mapDispatchToProps))
class TemplateEditor extends React.Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {
  editorNode: any;
  constructor(props: TemplateEditorSpace.IProps, context?: object) {
    super(props, context);

    if (this.props.template !== null) {
      const contentBlock = htmlToDraft(this.props.template.body);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState  = EditorState.createWithContent(contentState);
        this.state         = {
          selectImageOpen: false,
          isEdit: true,
          title: this.props.template.title,
          content: editorState,
          description: this.props.template.description
        };
      } else {
        this.state = {
          selectImageOpen: false,
          isEdit: true,
          title: this.props.template.title,
          content: EditorState.createEmpty(),
          description: this.props.template.description
        };
      }
    } else {
      this.state = {
        selectImageOpen: false,
        isEdit: false,
        title: `Image`,
        content: EditorState.createEmpty(),
        description: ''
      };
    }
  }

  onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }

  onChangeContent = (newHTML: string) => {
    this.setState({ content: newHTML });
  }

  onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value });
  }

  onAddImage = () => {
    this.setState({selectImageOpen: true});
  }
  copyTextToClipboard = (text: string): boolean => {
      // Find the dummy text area or create it if it doesn't exist
      const dummyTextAreaID = "utilities-copyTextToClipboard-hidden-TextArea-ID";
      let dummyTextArea: HTMLTextAreaElement = document.getElementById(dummyTextAreaID) as HTMLTextAreaElement;
      if (!dummyTextArea)
      {
          console.log("Creating dummy textarea for clipboard copy.");

          let textArea = document.createElement("textarea");
          textArea.id = dummyTextAreaID;

          // Place in top-left corner of screen regardless of scroll position.
          textArea.style.position = "fixed";
          textArea.style.top = "0";
          textArea.style.left = "0";

          // Ensure it has a small width and height. Setting to 1px / 1em
          // doesn't work as this gives a negative w/h on some browsers.
          textArea.style.width = "1px";
          textArea.style.height = "1px";

          // We don't need padding, reducing the size if it does flash render.
          textArea.style.padding = "0";

          // Clean up any borders.
          textArea.style.border = "none";
          textArea.style.outline = "none";
          textArea.style.boxShadow = "none";

          // Avoid flash of white box if rendered for any reason.
          textArea.style.background = "transparent";

          document.querySelector("body").appendChild(textArea);
          dummyTextArea = document.getElementById(dummyTextAreaID) as HTMLTextAreaElement;

          console.log("The dummy textarea for clipboard copy now exists.");
      }
      else
      {
          console.log("The dummy textarea for clipboard copy already existed.")
      }
      // Set the text in the text area to what we want to copy and select it
      dummyTextArea.value = text;
      dummyTextArea.select();
      // Now execute the copy command
      try
      {
          let status = document.execCommand("copy");
          if (!status)
          {
              console.error("Copying text to clipboard failed.");
              return false;
          }
          else
          {
              console.log("Text copied to clipboard.");
              return true;
          }
      }
      catch (error)
      {
          console.log("Unable to copy text to clipboard in this browser.");
          return false;
      }
  }
  pickHtmlContent = () => {
    window
    .getSelection()
    .selectAllChildren(this.editorNode.editor.editorContainer.children[0].children[0]);
    this.props.onShowToast('Content selected', ToastType.Success);
  }
  onGetHtml = () => {
    let status = document.execCommand("copy");
    const html = draftToHtml(convertToRaw(this.state.content.getCurrentContent()));
    this.copyTextToClipboard(html);
    this.props.onShowToast('Content copied to clipboard', ToastType.Success);
  }
  insertImage = (url: string) => {
    const { content } = this.state;
    const contentState = content.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      {src: url}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      content,
      {currentContent: contentStateWithEntity}
    );

    this.setState({
      content: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        '  '
      ),
      selectImageOpen: false
    });
  }

  handleCloseSelectImage = () => {
    this.setState({selectImageOpen: false});
  }

  render() {
    const { classes } = this.props;
    const save = () => {

      const body = draftToHtml(convertToRaw(this.state.content.getCurrentContent()));
        if (this.state.isEdit) {
            // change
            this.props.edit({
                id: this.props.template.id,
                title: this.state.title,
                body,
                description: this.state.description
            });
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
      this.props.remove({ id: [this.props.template.id] });
      this.props.closeTemplate();
    };

    return (
      <div style={{ height: '100%' }} className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Close"
                        onClick={this.props.closeTemplate}>
              <Close/>
            </IconButton>
            <Typography className={classes.flex} variant="title" color="inherit">
              {
                this.state.isEdit ? 'Edit template' : 'Create template'
              }
            </Typography>
            {
              this.state.isEdit &&
              <IconButton color="inherit" aria-label="Delete" onClick={remove}>
                <Delete/>
              </IconButton>
            }
          </Toolbar>
        </AppBar>
        <Paper elevation={4}>
          <div className={classes.offset}>
            <TextField
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
              label="Title template"
              margin="normal"
              id={'template_title'}
            />
          </div>
          <div className={classes.offset}>
            <TextField
              value={this.state.description}
              onChange={this.onChangeDescription}
              label="Description template"
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
              ref={ref => this.editorNode = ref}
              plugins={plugins}
              toolbarCustomButtons={[
                <IconButton key={1} color="inherit" aria-label="Delete" onClick={this.onAddImage}>
                  <AddToPhotos/>
                </IconButton>,
                <IconButton key={1} color="inherit" aria-label="Delete" onClick={this.onGetHtml}>
                  <ContentCopy />
                </IconButton>,
                <IconButton color="inherit" arial-label="Delete" onClick={this.pickHtmlContent}>
                  <GetApp />
                </IconButton>
              ]}
            />
          </div>
        </Paper>
        <div>
          <Fab className="fab fab_1" onClick={save} icon={<Save/>}/>
        </div>
        <DialogSelectImage handleClose={this.handleCloseSelectImage} isOpen={this.state.selectImageOpen} insertImage={this.insertImage}/>
      </div>
    );
  }
}

export default withStyles(styles)(TemplateEditor);
