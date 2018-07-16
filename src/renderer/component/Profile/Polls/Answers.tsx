import * as React from 'react';
import { IAnswer } from 'src/renderer/component/Profile/Polls/flux/interfase';
import { FormControl, FormControlLabel, Radio, RadioGroup, WithStyles, withStyles } from '@material-ui/core';
import { Component } from 'react';

const styles = theme => ({
});

export namespace AnswersSpace {
  export interface IProps {
    answers: IAnswer[];
    reply: any;
    classes?: any;
    answered: string;
  }

  export interface IState {
    // answer: string;
  }
}

export class Answers extends Component<AnswersSpace.IProps & WithStyles<any>, AnswersSpace.IState> {
  state: AnswersSpace.IState = {
    // answer: null,
  };

  handleChange = event => {
    const answer = event.target.value;
    // this.setState({ answer });
    this.props.reply(answer);
  }

  render() {
    const { classes, answers, answered } = this.props;
    return (
      <FormControl component='fieldset' required className={classes.formControl}>
        <RadioGroup
          name='pollAnswers'
          className={classes.group}
          value={answered}
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
