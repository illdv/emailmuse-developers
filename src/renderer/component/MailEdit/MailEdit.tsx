/* import { Component} from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper} from '@material-ui/core/';
import JoditEditor from 'jodit-react';
import { Save, Close, Send } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';

import 'jodit';
import 'jodit/build/jodit.min.css';
import '../Application.css';
import { Fab } from 'src/renderer/common/Fab';

export namespace MailEditSpace {
  export interface IState {
    content: string;
    selectedMailId: string;
  }

  export interface IProps {
    onResetSelectedMail?: () => void;
    onOpenCompose?: (selectedMailId: string) => () => void;
    classes?: any;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
});

// noinspection JSUnusedLocalSymbols
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onResetSelectedMail: () => {
    dispatch(FluxMail.Actions.selectMail(null, SelectedType.VIEW));
  },
  onAddMail: (newMail: IMailView) => {
    dispatch(FluxMail.Actions.addMail(newMail));
  },
  onSetMail: (newMail: IMailView) => {
    dispatch(FluxMail.Actions.setMail(newMail));
  },
  onOpenCompose: (selectedMailId: string) => () => {
    dispatch(FluxMail.Actions.selectMail(selectedMailId, SelectedType.COMPOSE));
  }
});

@(connect(mapStateToProps, mapDispatchToProps))
class MailEdit extends Component<MailEditSpace.IProps, MailEditSpace.IState> {

  state = {
    content: '',
    selectedMailId: '',
  };

  constructor(props: MailEditSpace.IProps, context?: object) {
    super(props, context);
  }

  onChangeContent = (newHTML: string) => {
  }


  render() {
    return (
      <div style={{ height: '100%' }}>
        <Paper elevation={4} style={{ height: '100%' }}>
          <JoditEditor
            value={this.state.content}
            onChange={this.onChangeContent}
            config={{ height: '100%' }}
          />
        </Paper>
        <div>
          <Fab className="fab fab_2" onClick={null} icon={<Send/>}/>
          <Fab className="fab fab_3" onClick={this.props.onResetSelectedMail} icon={<Close/>} color={'secondary'}/>
        </div>
      </div>
    );
  }
}

export default MailEdit;
 */