import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import ModalWindow from 'src/renderer/common/ModalWindow/ModalWindow';
import { ListTable, IListItem } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/utils';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import ListCard from 'src/renderer/common/List/ListCard/ListCard';
import { toItem } from 'src/renderer/component/Layouts/utils';

export namespace SelectLayoutSpace {
  export interface IState {

  }

  export interface IProps {
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
    return {id: item.id, title: item.title, description: '---', rightText: item.updated_at};
  }

  onSelect = (item: ILayout) => () => {

  }

  onChangePage = (item: ILayout) => () => {

  }

  render() {
    const {layouts, pagination} = this.props.layout;
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
  layoutActions: bindModuleAction(LayoutActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLayout);
