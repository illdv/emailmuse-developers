import * as React from 'react';
import { connect } from 'react-redux';

import * as constants from 'src/renderer/common/PreloaderLayout/Status/constants';
import { statusSelector } from 'src/renderer/common/PreloaderLayout/Status/selectors';
import { Loading } from 'src/renderer/common/Loading';

export namespace PreloaderLayoutSpace {
  export interface IProps {
    status?: constants.TStatus;
  }
  export interface IState {

  }
}

const mapStateToProps = state => ({
  status: statusSelector(state),
});

@connect(mapStateToProps)
export class PreloaderLayout extends React.Component<PreloaderLayoutSpace.IProps, PreloaderLayoutSpace.IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, children } = this.props;
    return (
      <>
        {status && status === constants.LOADING ? <Loading/> : null}
        {children}
      </>
    );
  }
}