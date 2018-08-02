import * as React from 'react';
import { connect } from 'react-redux';

import * as constants from 'src/renderer/common/PreloaderLayout/Status/constants';
import { statusSelector } from 'src/renderer/common/PreloaderLayout/Status/selectors';
import { Loading } from 'src/renderer/common/Loading';

export namespace PreloaderLayoutSpace {
  export interface IProps {
    status?: constants.TStatus;
    style?: any;
  }
  export interface IState {

  }
}

const mapStateToProps = state => ({
  status: statusSelector(state),
});

@connect(mapStateToProps)
export class PreLoaderLayout extends React.Component<PreloaderLayoutSpace.IProps, PreloaderLayoutSpace.IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, children, style } = this.props;
    return (
      <>
        {status && status === constants.LOADING ? <Loading style={style ? style : null}/> : null}
        {children}
      </>
    );
  }
}