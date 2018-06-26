import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect, Dispatch } from 'react-redux';

import { bindModuleAction } from 'src/renderer/utils';
import { OAuthActions } from 'src/renderer/component/Profile/Authorisation/flux/googleOAuth';
import { IOAuthActions } from 'src/renderer/component/Layouts/flux/interface';
import './oAuth.scss';
import { CSSProperties } from 'react';

// TODO: endure GOOGLE_CLIENT_ID in config;
const GOOGLE_CLIENT_ID = '1060161879537-00kfpluc02r509fuegpc9e2vbu8bku1u.apps.googleusercontent.com';

interface IgoogleAuth {
  children: any;
  actions: IOAuthActions;
}

/**
 * Component for google oAuth
 * @param {*} children
 * @param {IOAuthActions} actions
 * @returns {any}
 */
const googleAuth: React.SFC<IgoogleAuth> = ({ children, actions }) => {
  const onRequest = () => {
    actions.loginInGoogle.REQUEST({});
  };
  const onSuccess = response => {
    actions.loginInGoogle.SUCCESS({ accessToken: response.accessToken });
  };
  const onFail = error => {
    actions.loginInGoogle.FAILURE({ error });
  };
  const initialStyle: CSSProperties = {
    display: 'inline-block',
    margin: '25px auto 25px 0',
    color: '#fff',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2)' +
    ',0px 2px 2px 0px rgba(0, 0, 0, 0.14),' +
    '0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    minWidth: '88px',
    minHeight: '36px',
    cursor: 'pointer',
  };
  return (
    <GoogleLogin
      // className='btn__oauth'
      style={initialStyle}
      clientId={GOOGLE_CLIENT_ID}
      onRequest={onRequest}
      onSuccess={onSuccess}
      onFailure={onFail}
    ><span className='icon__google-oauth'/>
    </GoogleLogin>
  );
};
{/*<span className='icon__google-oauth' />*/
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindModuleAction(OAuthActions, dispatch),
});

export default connect(null, mapDispatchToProps)(googleAuth);
