import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  PictureInPicture,
  PictureInPictureAlt,
} from '@material-ui/icons';
import { Button, Paper, Typography } from '@material-ui/core';
import block from 'bem-ts';

import { createLayout } from 'src/renderer/component/Templates/utils';
import LayoutCard from 'src/renderer/component/Layouts/Layout/LayoutCard';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { ILayout } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplateAction } from 'src/renderer/component/Templates/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

import './Layouts.scss';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

const b = block('layout');

export namespace LayoutsSpace {
  export interface IState {
  }

  export interface IProps {
    actions?: ITemplateAction;
  }
}

const mapStateToProps = (state: IGlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return ({
    actions: {
      select: bindActionCreators(TemplateAction.select, dispatch),
      selectMenuItem: bindActionCreators(DrawerMenuAction.selectMenuItem, dispatch),
      create: bindActionCreators(TemplateAction.create, dispatch),
    },
  });
};

interface IlayoutList {
  body: string;
  description?: string;
  title?: string;
  icon?: any;
}

const mockTemplate2 = [
  {
    body: '<table style="width: 100%; height: 45px;">\n' +
    '   <tbody>\n' +
    '       <tr>\n' +
    '           <td>Left</td>\n' +
    '       </tr>\n' +
    '   </tbody>\n' +
    '</table>',
    description: 'Left aligned layout',
    title: 'Left', icon: 'FormatAlignLeft',
  },
  {
    body: '<table style="width: 100%; height: 45px; text-align: center;">\n' +
    '   <tbody>\n' +
    '       <tr>\n' +
    '           <td style="text-align: center;">center</td>\n' +
    '       </tr>\n' +
    '   </tbody>\n' +
    '</table>',
    description: 'Center aligned layout',
    title: 'Center', icon: 'FormatAlignCenter',
  },
  {
    body: `<table style="width: 100%; height: 45px; text-align: center;">\n
      <tbody>\n
          <tr>\n
              <td style="text-align: right;">right</td>\n
          </tr>\n
      </tbody>\n
   </table>`,
    description: 'Right aligned layout',
    title: 'Right', icon: 'FormatAlignRight'},
  {
    body: '<table style="width: 100%; height: 133px; text-align: center;">\n' +
    '   <tbody>\n' +
    '       <tr>\n' +
    '           <td style="text-align: center;">\n' +
    ' <img width="300px" ' +
    ' src="https://infocron.s3.us-east-2.amazonaws.com/user-5/UXfvr66OFICcmeUvi8hFmSJp85yQJeps5UQGFqLT.png" ' +
    ' style="width: 79px; height: 79px;"> \n' +
    '           </td>\n' +
    '       </tr>\n' +
    '       <tr>\n' +
    '           <td style="text-align: center;">Example text</td>\n' +
    '       </tr>\n' +
    '   </tbody>\n' +
    '</table>',
    description: 'Layout with picture top',
    title: 'Picture top', icon: 'PictureInPicture',
  },
  {
    body: '<div ><h3 style="float: left;">WAAAGH!</h3><img style="float: left;" ' +
    'src="https://infocron.s3.us-east-2.amazonaws.com/user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg.jpeg"/></div>',
    description: 'Layout with picture bottom',
    title: 'Picture bottom', icon: 'PictureInPictureAlt',
  },
];

export class Layouts extends Component<LayoutsSpace.IProps, LayoutsSpace.IState> {

  state: LayoutsSpace.IState = {};

  createLayout = (template: ILayout) => {
    this.props.actions.selectMenuItem({ selectedItem: MenuItemType.TEMPLATES });
    this.props.actions.create(createLayout(template));
  }

  selectLayout = (layoutList?: any) => {
    if (!layoutList || !layoutList.body) {
      layoutList = { body: '', description: '' };
    }
    const { body, description } = layoutList;
    this.createLayout({ body, description });
  }

  skip = () => {
    this.selectLayout({body: 'example text', description: 'empty'});
  }

  alignRight    = () => {
    this.selectLayout({ body: mockTemplate2[2].body, description: mockTemplate2[2].description });
  }
  alignLeft     = () => {
    this.selectLayout({ body: mockTemplate2[0].body, description: mockTemplate2[0].description });
  }
  alignCenter   = () => {
    this.selectLayout({ body: mockTemplate2[1].body, description: mockTemplate2[1].description });
  }
  pictureTop    = () => {
    this.selectLayout({ body: mockTemplate2[3].body, description: mockTemplate2[3].description });
  }

  render() {
    // const { } = this.props;
    const iconStyles = {
      fontSize: '10rem',
    };
    return (
      <Paper elevation={4}>
        <div className={b('header')}>
          <Typography variant='headline' align='center'>Choose a layout</Typography>
        </div>
        <div className={b('content')}>
          <div className={b('list')}>
            <LayoutCard cardTitle='Left' onClick={this.alignLeft}>
              <FormatAlignLeft color='primary' style={iconStyles} onClick={this.alignLeft}/>
            </LayoutCard>
            <LayoutCard cardTitle='Center' onClick={this.alignCenter}>
              <FormatAlignCenter color='primary' style={iconStyles} onClick={this.alignCenter}/>
            </LayoutCard>
            <LayoutCard cardTitle='Right' onClick={this.alignRight}>
              <FormatAlignRight color='primary' style={iconStyles} onClick={this.alignRight}/>
            </LayoutCard>
            <LayoutCard cardTitle='Logo top' onClick={this.pictureTop}>
              <PictureInPicture color='primary' style={iconStyles} onClick={this.pictureTop}/>
            </LayoutCard>

          </div>
          <Button
            className={b('button')}
            onClick={this.skip}
          >No thanks. I'll start from scratch
          </Button>
        </div>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);
