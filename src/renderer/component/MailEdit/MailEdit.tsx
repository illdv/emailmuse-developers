import { Component} from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper} from '@material-ui/core/';
import JoditEditor from 'jodit-react';
import { Save, Close, Send } from '@material-ui/icons';
import uniqid from 'uniqid';

import { IGlobalState } from 'src/renderer/flux/rootReducers';

import 'jodit';
import 'jodit/build/jodit.min.css';
import '../Application.css';
import { LabelsType, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';
import { FluxMail, SelectedType } from 'src/renderer/component/MailList/flux/action';
import { isMailSelected } from 'src/renderer/component/MailList/utils';
import { findSelectedMail } from 'src/renderer/component/MailEdit/utils';
import { Fab } from 'src/renderer/common/Fab';

export namespace MailEditSpace {
  export interface IState {
    content: string;
    selectedMailId: string;
  }

  export interface IProps {
    selectedMail: IMailView;
    mail?: FluxMail.IState;
    onResetSelectedMail?: () => void;
    onAddMail?: (newMail: IMailView) => void;
    onSetMail?: (newMail: IMailView) => void;
    onOpenCompose?: (selectedMailId: string) => () => void;
    classes?: any;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  mail: state.mail
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

  static getDerivedStateFromProps(nextProps: MailEditSpace.IProps, prevState: MailEditSpace.IState): MailEditSpace.IState {
    if (nextProps.mail.selectedMailId !== prevState.selectedMailId) {
      const { selectedMail } = nextProps;

      return {
        content: selectedMail.content,
        selectedMailId: selectedMail.id,
      };

    }
    return null;
  }

  state = {
    content: '',
    selectedMailId: '',
  };

  constructor(props: MailEditSpace.IProps, context?: object) {
    super(props, context);
  }


  shouldComponentUpdate(nextProps: Readonly<MailEditSpace.IProps>, nextState: Readonly<MailEditSpace.IState>, nextContext: any): boolean {
    return nextProps.mail.selectedMailId !== nextState.selectedMailId;
  }

  onChangeContent = (newHTML: string) => {
    this.setState({
      content: newHTML,
    });
    const {selectedType} = this.props.mail;
    if (selectedType === SelectedType.COMPOSE) {
      const mailView = findSelectedMail(this.props.mail);
      mailView.content = newHTML;
      this.props.onSetMail(mailView);
    }
  }

  onAddMailInArchive = () => {
    const selectedMail         = this.props.selectedMail;
    const cloneMail: IMailView = JSON.parse(JSON.stringify(selectedMail));
    cloneMail.id               = uniqid('ARCHIVE_');
    cloneMail.content          = this.state.content;
    cloneMail.labelsType       = [LabelsType.TEMPLATE];
    this.props.onAddMail(cloneMail);
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
        <div hidden={isMailSelected(this.props.mail, SelectedType.COMPOSE)}>
          <Fab className="fab fab_2" onClick={this.props.onOpenCompose(this.props.mail.selectedMailId)} icon={<Send/>}/>
          <Fab className="fab fab_3" onClick={this.onAddMailInArchive} icon={<Save/>}/>
          <Fab className="fab fab_4" onClick={this.props.onResetSelectedMail} icon={<Close/>} color={'secondary'}/>
        </div>
      </div>
    );
  }
}

export default MailEdit;
