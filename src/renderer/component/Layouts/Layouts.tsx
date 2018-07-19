import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Add } from '@material-ui/icons';
import { Button, Fade, Paper, Typography } from '@material-ui/core';
import block from 'bem-ts';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplateActions } from 'src/renderer/component/Templates/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

import './Layouts.scss';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { Loading } from 'src/renderer/common/Loading';
import { Fab } from 'src/renderer/common/Fab';
import PageCreateLayout from 'src/renderer/component/Layouts/PageCreateLayout';
import ListCard from 'src/renderer/common/List/ListCard/ListCard';
import { layoutToEditEntity, toItem } from 'src/renderer/component/Layouts/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';

const b = block('layout');

export namespace LayoutsSpace {
  export interface IState {
    showPopUp: boolean;
    editMode: boolean;
    editor: any;
  }

  export interface IProps {
    actions?: ITemplateActions;
    actionLayout: ILayoutActions;
    layout: ILayoutState;
    editorActions?: IEditorActions;
    showPopUp: boolean;
  }
}

export class Layouts extends Component<LayoutsSpace.IProps, LayoutsSpace.IState> {

  state: LayoutsSpace.IState = {
    showPopUp: false,
    editMode: false,
    editor: {},
  };

  componentDidMount(): void {
    this.props.actionLayout.loading.REQUEST({ page: 0 });
  }

  createTemplate = ({ title, body }: ILayout) => {
    this.props.editorActions.edit.REQUEST(emailToEditEntity({ body, title, description: '---' }));
  }

  onSkip = () => {
    this.createTemplate({ body: 'Example text', title: 'Email' });
  }

  createOwnTemplate = () => {
    this.setState({ showPopUp: true });
  }

  removeLayout = (id: string) => event => {
    event.stopPropagation();
    this.props.actionLayout.remove.REQUEST({ ids: [id] });
  };

  closePopup = () => {
    this.setState({ showPopUp: false });
  }

  onCloseOrRemove = (layout: ILayout) => {
    this.removeLayout(layout.id);
  }

  onSaveOrCreate = (layout: ILayout) => {
    this.props.actionLayout.edit.REQUEST({ layout });
  }

  onSelect = (layout: ILayout) => () => {
    this.createTemplate({ body: layout.body, title: layout.title });
  };

  editLayout = (layout: ILayout) => event => {
    event.stopPropagation();
    this.props.editorActions.edit.REQUEST(layoutToEditEntity(layout));
  }

  render() {
    const { layouts, pagination } = this.props.layout;

    if (!layouts) {
      return <Loading/>;
    }

    if (this.state.editMode) {
      return this.state.editor;
    }
    return (
      <div>
        <Fade in timeout={1000}>
          <Paper elevation={4}>
            <div className={b('header')}>
              <Typography variant='headline' align='center'>Choose a layout</Typography>
            </div>
            <div className={b('content')}>
              <ListCard
                entities={layouts}
                toItem={toItem}
                pagination={pagination}
                onSelectItem={this.onSelect}
                onRemoveItem={this.removeLayout}
                onEditItem={this.editLayout}
                onChangePage={null}
              />
              <Button
                className={b('button')}
                onClick={this.onSkip}
              >No thanks. I'll start from scratch
              </Button>
            </div>
          </Paper>
        </Fade>
        <Fab
          onClick={this.createOwnTemplate}
          icon={<Add/>}
          position={0}
          title={'Create your own template'}
          whitCtrl
          hotKey={'A'}
        />
        <PageCreateLayout
          isOpen={this.state.showPopUp}
          handleClose={this.closePopup}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  layout: state.layouts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return ({
    actionLayout: bindModuleAction(LayoutActions, dispatch),
    editorActions: bindModuleAction(EditorActions, dispatch),
    actions: {
      selectMenuItem: bindActionCreators(DrawerMenuAction.selectMenuItem, dispatch),
      create: bindActionCreators(TemplateActions.create, dispatch),
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);
