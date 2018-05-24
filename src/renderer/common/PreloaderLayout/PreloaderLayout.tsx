import * as React from 'react';
import * as constants from 'src/renderer/common/PreloaderLayout/Status/constants';
import { connect } from 'react-redux';
import { statusSelector } from 'src/renderer/common/PreloaderLayout/Status/selectors';
import { Preloader } from 'src/renderer/common/PreloaderLayout/Preloader';

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
        {status && status === constants.LOADING ? <Preloader/> : null}
        {children}
      </>
    );
  }
}