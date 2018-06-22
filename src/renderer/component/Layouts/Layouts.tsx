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
    body: '' +
    '<table align="left"\n' +
    '       border="0"\n' +
    '       cellpadding="0"\n' +
    '       cellspacing="0"\n' +
    '       role="presentation"\n' +
    '       style="max-width:680px;"\n' +
    '       width="100%">\n' +
    '  <tbody>\n' +
    '  <tr>\n' +
    '    <td bgcolor="#ffffff">\n' +
    '      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">\n' +
    '        <tbody>\n' +
    '        <tr>\n' +
    '          <td\n' +
    '          style="\n' +
    '            padding:9px;\n' +
    '            font-family:sans-serif;\n' +
    '            font-size:16px;\n' +
    '            line-height:20px;\n' +
    '            color:#000000"\n' +
    '          >\n' +
    '            Body of email here\n' +
    '            <br>\n' +
    '            And another line\n' +
    '            <br><br>\n' +
    '            Sincerely,\n' +
    '            <br><br>\n' +
    '            Your Name\n' +
    '          </td>\n' +
    '        </tr>\n' +
    '        </tbody>\n' +
    '      </table>\n' +
    '    </td>\n' +
    '  </tr>\n' +
    '  </tbody>\n' +
    '</table>',
    description: 'Left aligned layout',
    title: 'Left', icon: 'FormatAlignLeft',
  },
  {
    body: '<table\n' +
    '    align="center"\n' +
    '    border="0"\n' +
    '    cellpadding="0"\n' +
    '    cellspacing="0"\n' +
    '    role="presentation"\n' +
    '    style="max-width:680px;"\n' +
    '    width="100%"\n' +
    '>\n' +
    '  <tbody>\n' +
    '  <tr>\n' +
    '    <td bgcolor="#ffffff">\n' +
    '      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">\n' +
    '        <tbody>\n' +
    '        <tr>\n' +
    '          <td\n' +
    '          style="padding:9px;\n' +
    '          font-family:sans-serif;\n' +
    '          font-size:16px;\n' +
    '          line-height:20px;\n' +
    '          color:#000000"\n' +
    '          >\n' +
    '            Body of email here\n' +
    '            <br>\n' +
    '            And another line\n' +
    '            <br>\n' +
    '            <br>\n' +
    '            Sincerely,\n' +
    '            <br>\n' +
    '            <br>\n' +
    '            Your Name\n' +
    '          </td>\n' +
    '        </tr>\n' +
    '        </tbody>\n' +
    '      </table>\n' +
    '    </td>\n' +
    '  </tr>\n' +
    '  </tbody>\n' +
    '</table>',
    description: 'Center aligned layout',
    title: 'Center', icon: 'FormatAlignCenter',
  },
  {
    body: '<table \n' +
    '    align="center" \n' +
    '    border="0" \n' +
    '    cellpadding="0" \n' +
    '    cellspacing="0" \n' +
    '    role="presentation" \n' +
    '    style="max-width:680px;"\n' +
    '    width="100%"\n' +
    '>\n' +
    '  <tbody>\n' +
    '  <tr>\n' +
    '    <td bgcolor="#ffffff" style="text-align: center;background: #fff;"> Logo here\n' +
    '      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">\n' +
    '        <tbody>\n' +
    '        <tr>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '          <td \n' +
    '           style="\n' +
    '              padding:9px;\n' +
    '              font-family:sans-serif;\n' +
    '              font-size:16px;\n' +
    '              line-height:20px;\n' +
    '              color:#000000;\n' +
    '              background: #fff;"\n' +
    '          >\n' +
    '            Body of email here<br>And another line<br><br>Sincerely,<br><br>Your Name\n' +
    '          </td>\n' +
    '        </tr>\n' +
    '        </tbody>\n' +
    '      </table>\n' +
    '    </td>\n' +
    '  </tr>\n' +
    '  </tbody>\n' +
    '</table>',
    description: 'Layout with picture top',
    title: 'Picture top', icon: 'PictureInPicture',
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
    this.selectLayout({ body: 'Example text', description: 'empty' });
  }

  alignLeft   = () => {
    this.selectLayout({ body: mockTemplate2[0].body, description: mockTemplate2[0].description });
  }

  alignCenter = () => {
    this.selectLayout({ body: mockTemplate2[1].body, description: mockTemplate2[1].description });
  }

  pictureTop  = () => {
    this.selectLayout({ body: mockTemplate2[2].body, description: mockTemplate2[2].description });
  }

  render() {
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
