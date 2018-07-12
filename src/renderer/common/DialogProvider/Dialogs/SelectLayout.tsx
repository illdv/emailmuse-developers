import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import ModalWindow, { IModalAction } from 'src/renderer/common/DialogProvider/ModalWindow';
import { IListItem } from 'src/renderer/common/List/ListTable/ListTable';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { ILayout, ILayoutActions, ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import ListCard from 'src/renderer/common/List/ListCard/ListCard';
import { toItem } from 'src/renderer/component/Layouts/utils';
import { IModalWindowActions, ModalWindowActions } from 'src/renderer/common/DialogProvider/flux/actions';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';

export namespace SelectLayoutSpace {
  export interface IState {

  }

  export interface IProps {
    layoutActions?: ILayoutActions;
    layout?: ILayoutState;
    modalWindowActions?: IModalWindowActions;
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
    this.props.modalWindowActions.show.SUCCESS({ layout: item });
  }

  onChangePage = (item: ILayout) => () => {

  }

  selectScratch = () => {
    const layout: ILayout = {
      id: null,
      body: '<div id="content-email"></div>',
      title: 'Scratch',
    };

    this.props.modalWindowActions.show.SUCCESS({ layout });
  }

  render() {
    const { layouts, pagination } = this.props.layout;

    const actions: IModalAction[] = [
      { title: 'No thanks. I\'ll start from scratch', color: 'primary', onClick: this.selectScratch },
    ];

    return (
      <ModalWindow actions={actions}>
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
  modalWindowActions: bindModuleAction(ModalWindowActions, dispatch),
  layoutActions: bindModuleAction(LayoutActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLayout);
