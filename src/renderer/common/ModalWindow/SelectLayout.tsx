import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import ModalWindow from 'src/renderer/common/ModalWindow/ModalWindow';
import { ElementTable, IListItem } from 'src/renderer/common/List/ElementTable';
import { bindModuleAction } from 'src/renderer/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';

export namespace SelectLayoutSpace {
  export interface IState {

  }

  export interface IProps {
    layoutActions?: ILayoutActions;
    layout?: ILayoutState;
  }
}

export class SelectLayout extends Component<SelectLayoutSpace.IProps, SelectLayoutSpace.IState> {

  state: SelectLayoutSpace.IState = {};

  componentDidMount(): void {
    this.props.layoutActions.loading.REQUEST({});
  }

  toItem = (item: ILayout): IListItem => {
    return {id: item.id, title: item.title, description: '---', rightText: item.updated_at};
  }

  onOpenItem = (item: ILayout) => () => {

  }

  onChangePage = (item: ILayout) => () => {

  }

  render() {
    const {layouts, pagination} = this.props.layout;
    return (
      <ModalWindow>
        <ElementTable
          entities={layouts}
          toItem={this.toItem}
          pagination={pagination}
          onOpenItem={this.onOpenItem}
          onChangePage={this.onChangePage}
        />
      </ModalWindow>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  layout: state.layouts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  layoutActions: bindModuleAction(LayoutActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLayout);
