import { createAsyncAction2 } from 'src/renderer/flux/utils';
import { IOAuthActions } from 'src/renderer/component/Layouts/flux/interface';

const REDUCER = 'OAUTH';
const NS      = `${REDUCER}__`;

export const LOGIN_IN_GOOGLE = `${NS}LOGIN_IN_GOOGLE`;

const loginInGoogle = createAsyncAction2<{}, {accessToken: string}>(LOGIN_IN_GOOGLE);

export const OAuthActions: IOAuthActions = {
  loginInGoogle,
};
