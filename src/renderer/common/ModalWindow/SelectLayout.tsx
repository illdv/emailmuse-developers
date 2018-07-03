import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import ModalWindow from 'src/renderer/common/ModalWindow/ModalWindow';
import { IListItem } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import ListCard from 'src/renderer/common/List/ListCard/ListCard';
import { toItem } from 'src/renderer/component/Layouts/utils';
import { ISwipeActions, SwipeActions } from 'src/renderer/component/Swipe/flux/actions';

export namespace SelectLayoutSpace {
  export interface IState {

  }

  export interface IProps {
    swipeActions?: ISwipeActions;
    layoutActions?: ILayoutActions;
    layout?: ILayoutState;
  }
}

class SelectLayout extends Component<SelectLayoutSpace.IProps, SelectLayoutSpace.IState> {

  state: SelectLayoutSpace.IState = {};

  componentDidMount(): void {
    this.props.layoutActions.loading.REQUEST({});
  }

  toItem = (item: ILayout): IListItem => {
    return { id: item.id, title: item.title, description: '---', rightText: item.updated_at };
  }

  onSelect = (item: ILayout) => () => {
    this.props.swipeActions.selectLayout.REQUEST({ layout: item });
  }

  onChangePage = (item: ILayout) => () => {

  }

  render() {
    const { layouts, pagination } = this.props.layout;
    return (
      <ModalWindow>
        <ListCard
          entities={layouts}
          toItem={toItem}
          pagination={pagination}
          onSelectItem={this.onSelect}
          onRemoveItem={null}
          onEditItem={null}
          onChangePage={null}
        />
      </ModalWindow>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  layout: state.layouts,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  swipeActions: bindModuleAction(SwipeActions, dispatch),
  layoutActions: bindModuleAction(LayoutActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLayout);
