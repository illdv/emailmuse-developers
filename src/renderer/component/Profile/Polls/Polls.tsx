import { Component } from 'react';
import * as React from 'react';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { connect, Dispatch } from 'react-redux';
import { IPollsActions, PollsActions } from 'src/renderer/component/Profile/Polls/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IPoll, IQuestion } from 'src/renderer/component/Profile/Polls/flux/interfase';
import {
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import Answers from 'src/renderer/component/Profile/Polls/flux/Answers';
import { Loading } from 'src/renderer/common/Loading';

const styles = theme => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 1130,
    height: 946,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  },
});

export namespace PollsSpace {
  export interface IState {
    answerNumber: number;
    answers: string[];
    question: IQuestion;
  }

  export interface IProps {
    pallsActions: IPollsActions;
    polls: IPoll;
    classes?: any;
  }
}

export class Polls extends Component<PollsSpace.IProps, PollsSpace.IState> {
  constructor(props) {
    super(props);
    // this.next.bind(this);
  }

  state: PollsSpace.IState = {
    answerNumber: 0,
    answers: [],
    question: this.props.polls.questions[0],
  };

  // next = (answer: string) => {
  //   const { questions } = this.props.polls;
  //   const { answers, answerNumber } = this.state;
  //   this.setState({ answers: [...answers, answer], answerNumber: answerNumber + 1 });
  //   if (!questions[answerNumber]) {
  //     this.props.pallsActions.savePoll.REQUEST({answers});
  //     return;
  //   }
  //   this.setState({ question: questions[answerNumber] });
  // }

  * next(answer: string) {
    const { questions } = this.props.polls;
    const { answers, answerNumber } = this.state;
    yield this.setState({ answers: [...answers, answer] });
    if (!questions[answerNumber]) {
      yield this.props.pallsActions.savePoll.REQUEST({ answers });
    }
    yield this.setState({ question: questions[answerNumber] });
  }

  render() {
    const { classes } = this.props;
    const { question } = this.state;
    if (question !== null) {
      return (
        <InCenter>
          <Paper className={classes.paper}>
            <InCenter>
              <div className={classes.question}>
                <Typography variant='title' gutterBottom>
                  {question.title}
                </Typography>
                <Typography variant='subheading' gutterBottom>
                  {question.description}
                </Typography>
              </div>
              <Answers answers={question.answers} reply={this.next}/>
            </InCenter>
          </Paper>
        </InCenter>
      );
    }
    return <Loading/>;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  polls: state.polls.poll,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  pallsActions: bindModuleAction(PollsActions, dispatch),
});

export default withStyles(styles)
(connect(mapStateToProps, mapDispatchToProps)(Polls));
