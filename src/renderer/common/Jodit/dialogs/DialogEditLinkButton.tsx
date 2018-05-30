import * as React from 'react';
import { SketchPicker } from 'react-color';
import { Component, ChangeEvent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import block from 'bem-ts';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TablePagination,
  TextField,
  Grid,
} from '@material-ui/core';

import './DialogEditLinkButton.scss';

const b = block('dialog-edit-link-button');

const defaultButtonStyle = {
  border: 'none',
};

interface rgbObj {
  r: number;
  g: number;
  b: number;
  a: number;
}

export namespace DialogEditLinkButtonSpace {
  export interface IState {
    text: string;
    url: string;
    color: rgbObj;
    background: rgbObj;
    displayColorPicker: boolean;
    displayBackgroundPicker: boolean;
  }

  export interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    insertHTML: (url: string, callback: () => void) => void;
  }
}

const LinkButton = (text: string, url: string, color: string, background: string): string => {
  const style = `
    padding: 15px;
    border: none;
    color: ${color};
    background-color: ${background};
    border-radius: 4px;
    text-decoration: none;
  `.replace(/\t|\r/g, '');

  return `<a href="${url}" style="${style}">${text}</a>`;
};

const getRgba = ({r, g, b, a}: rgbObj) => `rgba(${r}, ${g}, ${b}, ${a})`;

export class DialogEditLinkButton extends Component<DialogEditLinkButtonSpace.IProps, DialogEditLinkButtonSpace.IState>{

  state = {
      text: 'Click Here',
      url: 'http://',
      color: {r: 255, g: 255, b: 255, a: 1},
      background: {r: 0, g: 111, b: 239, a: 0.93},
      displayColorPicker: false,
      displayBackgroundPicker: false,
  };

  changeText = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
        text: e.target.value,
    });
  }

  changeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
        url: e.target.value,
    });
  }

  changeColor = (color) => {
    this.setState({ color: color.rgb });
  }

  changeBackground = (color) => {
    this.setState({ background: color.rgb });
  }

  showColorPicker = (color) => {
    this.setState({ displayColorPicker: true });
  }

  showBackgroundPicker = (color) => {
    this.setState({ displayBackgroundPicker: true });
  }

  hideColorPicker = (color) => {
    this.setState({ displayColorPicker: false });
  }

  hideBackgroundPicker = (color) => {
    this.setState({ displayBackgroundPicker: false });
  }

  add = () => {
    const {text, url, color, background} = this.state;
    const element = LinkButton(text, url, getRgba(color), getRgba(background));
    this.props.insertHTML(element, this.props.handleClose);
  }

  render() {
    const {text, url, color, background} = this.state;

    return (
      <Dialog
        fullWidth
        className={b('dialog')}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        maxWidth={'sm'}
        aria-labelledby='responsive-dialog-title'
      >
        <Paper elevation={4}>
          <DialogContent>
            <div className={b('container')}>
              <h3>Call to Action Button</h3>
              <Grid container spacing={24}>
                <Grid item xs={7}>
                  <TextField
                    id='text'
                    label='Text'
                    value={text}
                    margin='normal'
                    placeholder='Click Here'
                    onChange={this.changeText}
                  />
                  <br/>
                  <TextField
                    id='text'
                    label='URL'
                    margin='normal'
                    value={url}
                    onChange={this.changeUrl}
                  />
                </Grid>
                <Grid item xs={5}>     
                  <div className={b('group')} onClick={this.showColorPicker}>
                    <div className={b('color-point')} style={{ background: getRgba(color) }} />
                    <span className={b('color-label')}>Text color</span>
                  </div>
                  {
                    this.state.displayColorPicker &&
                    <div>
                      <div className={b('cover')} onClick={this.hideColorPicker} />
                      <div className={b('color-picker')}>
                        <SketchPicker color={color} onChange={this.changeColor} />
                      </div>
                    </div>
                  }
                  <br/>
                  <div className={b('group')} onClick={this.showBackgroundPicker}>
                    <div className={b('color-point')} style={{ background: getRgba(background) }} />
                    <span className={b('color-label')}>Background color</span>
                  </div>
                  {
                    this.state.displayBackgroundPicker &&
                    <div>
                      <div className={b('cover')} onClick={this.hideBackgroundPicker} />
                      <div className={b('color-picker')}>
                        <SketchPicker color={background} onChange={this.changeBackground} />
                      </div>
                    </div>
                  }
                </Grid>
              </Grid>
              <div
                className={b('link-button-container')}
                dangerouslySetInnerHTML={{
                  __html: LinkButton(text, url, getRgba(color), getRgba(background)),
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.add} color='primary'>
              Add
            </Button>
            <Button onClick={this.props.handleClose} color='secondary'>
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  }
}
