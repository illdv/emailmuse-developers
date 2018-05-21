import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper, TextField } from '@material-ui/core/';

import { Save, Close, Send } from '@material-ui/icons';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplate } from './models';

import { create, change } from 'src/renderer/component/Templates/flux/module';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import '../Application.css';
import { Fab } from 'src/renderer/common/Fab';

export namespace TemplateEditorSpace {
    
    export interface IProps {
        template: ITemplate|null;
        closeTemplate: () => void;
        change?: any;
        create?: any;
    }
    export interface IState {
        edit: boolean;
        title: string;
        content: string;
        description: string;
    }
}

const mapStateToProps = (state: IGlobalState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    change: (data) => dispatch(change(data)),
    create: (data) => dispatch(create(data))
});

@(connect(mapStateToProps, mapDispatchToProps))
class TemplateEditor extends React.Component<TemplateEditorSpace.IProps, TemplateEditorSpace.IState> {

  constructor(props: TemplateEditorSpace.IProps, context?: object) {
    super(props, context);

    if (this.props.template !== null) {
        this.state = {
            edit: true,
            title: this.props.template.title,
            content: this.props.template.body,
            description: this.props.template.description
        };
    } else {
        this.state = {
            edit: false,
            title: '',
            content: '',
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
    const save = () => {
        console.log(save);
        if (this.props.template !== null) {
            // change
            this.props.change({
                id: this.props.template.id,
                title: this.state.title,
                body: this.state.content,
                description: this.state.description
            })
        } else {
            // save
            this.props.create({
                title: this.state.title,
                body: this.state.content,
                description: this.state.description
            });
        }
    };

    return (
      <div style={{ height: '100%' }}>
        <Paper elevation={4} style={{ height: '100%' }}>
            <div>
                <h3>
                    {
                        this.state.edit ? 'Edit template' : 'Create template'
                    }
                </h3>
            </div>
            <TextField
                value={this.state.title}
                onChange={this.onChangeTitle}
                label='Title template'
                margin="normal"
            />
            <TextField
                value={this.state.description}
                onChange={this.onChangeDescription}
                label='Description template'
                margin="normal"
            />
          <JoditEditor
            value={this.state.content}
            onChange={this.onChangeContent}
            config={{ height: '80%' }}
          />
        </Paper>
        <div>
          <Fab className="fab fab_2" onClick={save} icon={<Save/>}/>
          <Fab className="fab fab_3" onClick={this.props.closeTemplate} icon={<Close/>} color={'secondary'}/>
        </div>
      </div>
    );
  }
}

export default TemplateEditor;