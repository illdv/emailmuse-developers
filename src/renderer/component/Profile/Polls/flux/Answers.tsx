import * as React from 'react';
import { IAnswer } from 'src/renderer/component/Profile/Polls/flux/interfase';
import { FormControl, FormControlLabel, Radio, RadioGroup, WithStyles, withStyles } from '@material-ui/core';
import { Component } from 'react';

const styles = theme => ({
  root: {
    height: '100%',
  },
  question: {
    width: '100%',
    maxWidth: 500,
  },
});

export namespace AnswersSpace {
  export interface IProps {
    answers: IAnswer[];
    reply: any;
    classes?: any;
  }

  export interface IState {
    answer: string;
  }
}

export class Answers extends Component<AnswersSpace.IProps & WithStyles<any>, AnswersSpace.IState> {
  state: AnswersSpace.IState = {
    answer: null,
  };

  handleChange = event => {
    const answer = event.target.value;
    this.setState({ answer });
    this.props.reply(answer);
  };

  render() {
    const { classes, answers } = this.props;
    return (
      <FormControl component='fieldset' required className={classes.formControl}>
        <RadioGroup
          name='pollAnswers'
          className={classes.group}
          value={this.state.answer}
        >{answers && answers.map(answer => (
            <FormControlLabel
              key={answer.id}
              value={String(answer.id)}
              control={<Radio/>}
              label={answer.body}
              onChange={this.handleChange}
              color='primary'
            />
          ),
        )}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Answers);
