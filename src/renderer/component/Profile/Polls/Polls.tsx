import * as React from 'react';
import { Component } from 'react';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { connect, Dispatch } from 'react-redux';
import { IPollsActions, PollsActions } from 'src/renderer/component/Profile/Polls/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { IPoll, IQuestion } from 'src/renderer/component/Profile/Polls/flux/interfase';
import { Grid, Paper, Typography, withStyles, } from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import Answers from 'src/renderer/component/Profile/Polls/Answers';
import { Loading } from 'src/renderer/common/Loading';

const styles = theme => ({
  root: {
    height: '100%',
  },
  paper: {
    width: 630,
    height: 500,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  },
  question: {
    'width': '100%',
    'text-align': 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export namespace PollsSpace {
  export interface IState {
    answer: string;
  }

  export interface IProps {
    pallsActions: IPollsActions;
    polls: IPoll;
    currentQuestion: IQuestion;
    classes?: any;
  }
}

export class Polls extends Component<PollsSpace.IProps, PollsSpace.IState> {
  state: PollsSpace.IState = {
    answer: null,
  };

  next = (answer: string) => {
    this.setState({ answer });
    setTimeout(() => {
      this.props.pallsActions.nextQuestion.REQUEST({ answer });
    }, 500);
  }

  render() {
    const { classes } = this.props;
    const question = this.props.currentQuestion;
    if (question) {
      return (
        <InCenter>
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.root}>
              <Grid
                className={classes.root}
                container
                spacing={16}
                alignItems={'center'}
                justify={'center'}
                direction={'column'}
              >
                <Grid item>
                  <Typography variant='title' gutterBottom>
                    {question.title}
                  </Typography>
                  <Typography variant='subheading' gutterBottom>
                    {question.description}
                  </Typography>
                </Grid>
                <Grid>
                  <Answers answers={question.answers} reply={this.next} answered={this.state.answer}/>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </InCenter>
      );
    }
    return <Loading/>;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  polls: state.polls.poll,
  currentQuestion: state.polls.currentQuestion,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  pallsActions: bindModuleAction(PollsActions, dispatch),
});

export default withStyles(styles)
(connect(mapStateToProps, mapDispatchToProps)(Polls));
