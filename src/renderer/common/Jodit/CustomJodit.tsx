import { Component } from 'react';
import * as React from 'react';

import { DialogSelectImage } from 'src/renderer/component/Templates/DialogSelectImage'
import { JoditEditor } from 'src/renderer/common/Jodit/JoditEditor'

export namespace CustomJoditSpace {
  export interface IState {

  }

  export interface IProps {

  }
}

export class CustomJodit extends Component<CustomJoditSpace.IProps, CustomJoditSpace.IState> {

  state = {};

  render() {
    return (
      <>
        <JoditEditor value={} option={} onChangeValue={}/>
        <DialogSelectImage
          handleClose={this.handleCloseSelectImage}
          isOpen={this.state.selectImageOpen}
          insertImage={this.insertImage}
        />
      </>
    );
  }
}
