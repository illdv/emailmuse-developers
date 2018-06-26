import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Button, Fade, Paper, Typography } from '@material-ui/core';
import block from 'bem-ts';

import LayoutCard from 'src/renderer/component/Layouts/Layout/LayoutCard';
import { TemplateAction } from 'src/renderer/component/Templates/flux/module';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplateAction } from 'src/renderer/component/Templates/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

import './Layouts.scss';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { bindModuleAction } from 'src/renderer/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { Loading } from 'src/renderer/common/Loading';

const b = block('layout');

export namespace LayoutsSpace {
  export interface IState {
  }

  export interface IProps {
    actions?: ITemplateAction;
    actionLayout: ILayoutActions;
    layout: ILayoutState;
  }
}

export class Layouts extends Component<LayoutsSpace.IProps, LayoutsSpace.IState> {

  state: LayoutsSpace.IState = {};

  createTemplate = ({ title, body }: ILayout) => {
    this.props.actions.selectMenuItem({ selectedItem: MenuItemType.TEMPLATES });
    this.props.actions.create({ body, title, description: '---' });
  }

  onSkip = () => {
    this.createTemplate({ body: 'Example text', title: 'Email' });
  }

  componentDidMount(): void {
    this.props.actionLayout.loading.REQUEST({ page: 0 });
  }

  onSelect = (layout: ILayout) => () => {
    console.log(layout);
  }

  render() {
    const iconStyles = {
      fontSize: '10rem',
    };

    const { layouts } = this.props.layout;

    if (!layouts) {
      return <Loading/>;
    }

    return (
      <Fade in timeout={1000}>
        <Paper elevation={4}>
          <div className={b('header')}>
            <Typography variant='headline' align='center'>Choose a layout</Typography>
          </div>
          <div className={b('content')}>
            <div className={b('list')}>
              {
                layouts.map((layout, index) => (
                  <LayoutCard key={index} cardTitle={layout.title} onClick={this.onSelect(layout)}>
                    <img src={layout.icon_url}/>
                  </LayoutCard>
                ))
              }
            </div>
            <Button
              className={b('button')}
              onClick={this.onSkip}
            >
              No thanks. I'll start from scratch
            </Button>
          </div>
        </Paper>
      </Fade>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  layout: state.layouts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return ({
    actionLayout: bindModuleAction(LayoutActions, dispatch),
    actions: {
      select: bindActionCreators(TemplateAction.select, dispatch),
      selectMenuItem: bindActionCreators(DrawerMenuAction.selectMenuItem, dispatch),
      create: bindActionCreators(TemplateAction.create, dispatch),
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);
