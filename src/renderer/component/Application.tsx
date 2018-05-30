import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { Layout } from 'src/renderer/component/Profile/Auth/Layout';
import MainLayout from 'src/renderer/component/MainLayout/MainLayout';

import './Application.scss';
import { Toast } from 'src/renderer/common/Toast/Toast';
import { TemplateEditor } from 'src/renderer/component/Templates/TemplateEditor';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';

export namespace MainLayoutScope {

  export interface IState {
  }

  export interface IProps {
    profile?: IProfileState;
  }

}

const mapStateToProps = (state: IGlobalState) => ({
  profile: state.profile,
});

@(connect(mapStateToProps))
class Application extends React.Component<MainLayoutScope.IProps, MainLayoutScope.IState> {

  constructor(props: MainLayoutScope.IProps) {
    super(props);

    this.state = {
      layouts: [],
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  render() {
    const { token } = this.props.profile.auth.user;
    return (
      <>
        {!!token && <MainLayout/> || <Layout/>}
        <Toast/>
      </>
  );
  }
}

export default Application;
