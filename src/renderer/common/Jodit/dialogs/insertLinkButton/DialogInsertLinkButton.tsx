import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { SketchPicker } from 'react-color';
import { connect, Dispatch } from 'react-redux';
import block from 'bem-ts';
import htmlToImage from 'html-to-image';

import { Button, Dialog, DialogActions, DialogContent, Grid, Paper, TextField } from '@material-ui/core';

import './DialogInsertLinkButton.scss';

const b = block('dialog-insert-link-button');

interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export namespace DialogEditLinkButtonSpace {
  export interface IState {
    text: string;
    url: string;
    color: IRGBA;
    background: IRGBA;
    displayColorPicker: boolean;
    displayBackgroundPicker: boolean;
    width: number;
    height: number;
    padding: number;
    fontSize: number;
  }

  export interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    insertHTML: (url: string, callback: () => void) => void;
  }
}

const getRgba = (rgba: IRGBA) => `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

export class DialogInsertLinkButton
  extends Component<DialogEditLinkButtonSpace.IProps, DialogEditLinkButtonSpace.IState> {

  state = {
    text: 'Click Here',
    url: 'http://',
    color: { r: 255, g: 255, b: 255, a: 1 },
    background: { r: 0, g: 111, b: 239, a: 0.93 },
    displayColorPicker: false,
    displayBackgroundPicker: false,
    width: 0,
    height: 0,
    padding: 15,
    fontSize: 12,
  };

  private buttonDOMElement: React.RefObject<HTMLInputElement>;

  constructor(props, context){
    super(props, context);
    this.buttonDOMElement = React.createRef();
  }

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

  GenerateLinkButton = () => {
    const { width, height, padding, fontSize, color, background } = this.state;
    const style: any = {
      padding,
      fontSize,
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      color: getRgba(color),
      backgroundColor: getRgba(background),
    };

    if (width > 0) {
      style.width = width;
    }

    if (height > 0) {
      style.height = height;
    }

    return <button style={style}>{this.state.text}</button>;
  }

  changeColor = color => {
    this.setState({ color: color.rgb });
  }

  changeBackground = color => {
    this.setState({ background: color.rgb });
  }

  showColorPicker = () => {
    this.setState({ displayColorPicker: true });
  }

  showBackgroundPicker = () => {
    this.setState({ displayBackgroundPicker: true });
  }

  hideColorPicker = () => {
    this.setState({ displayColorPicker: false });
  }

  hideBackgroundPicker = () => {
    this.setState({ displayBackgroundPicker: false });
  }

  changeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: Number(e.target.value) });
  }

  changeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: Number(e.target.value) });
  }

  changePadding = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ padding: Number(e.target.value) });
  }

  changeFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ fontSize: Number(e.target.value) });
  }

  add = () => {
    const { text, url, color, background } = this.state;
    
    const node = this.buttonDOMElement.current;
    htmlToImage.toPng(node)
      .then(dataUrl => {
        const img = new Image();
        img.src = dataUrl;

        const wrap = document.createElement('div');
        wrap.appendChild(img);

        const link = `<a href='${this.state.url}'>${wrap.innerHTML}</a>`;

        this.props.insertHTML(link, this.props.handleClose);
      });
  }

  render() {
    const GenerateLinkButton = this.GenerateLinkButton;
    const { text, url, color, background, width, height, padding, fontSize } = this.state;

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
                  <br/>
                  <TextField
                    id='text'
                    label='Width'
                    margin='normal'
                    value={width}
                    onChange={this.changeWidth}
                  />
                  <br/>
                  <TextField
                    id='text'
                    label='Padding'
                    margin='normal'
                    value={padding}
                    onChange={this.changePadding}
                  />
                </Grid>
                <Grid item xs={5}>
                  <div className={b('group')} onClick={this.showColorPicker}>
                    <div className={b('color-point')} style={{ background: getRgba(color) }}/>
                    <span className={b('color-label')}>Text color</span>
                  </div>
                  {
                    this.state.displayColorPicker &&
                    <div>
                      <div className={b('cover')} onClick={this.hideColorPicker}/>
                      <div className={b('color-picker')}>
                        <SketchPicker color={color} onChange={this.changeColor}/>
                      </div>
                    </div>
                  }
                  <br/>
                  <div className={b('group')} onClick={this.showBackgroundPicker}>
                    <div className={b('color-point')} style={{ background: getRgba(background) }}/>
                    <span className={b('color-label')}>Background color</span>
                  </div>
                  {
                    this.state.displayBackgroundPicker &&
                    <div>
                      <div className={b('cover')} onClick={this.hideBackgroundPicker}/>
                      <div className={b('color-picker')}>
                        <SketchPicker color={background} onChange={this.changeBackground}/>
                      </div>
                    </div>
                  }
                  <br/>
                  <TextField
                    id='text'
                    label='Height'
                    margin='normal'
                    value={height}
                    onChange={this.changeHeight}
                  />
                  <br/>
                  <TextField
                    id='text'
                    label='Font size'
                    margin='normal'
                    value={fontSize}
                    onChange={this.changeFontSize}
                  />
                </Grid>
              </Grid>
              <div className={b('link-button-container')}>
                <div style={{display: 'inline-block'}} ref={this.buttonDOMElement as any}>
                  <GenerateLinkButton />
                </div>
              </div>
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
