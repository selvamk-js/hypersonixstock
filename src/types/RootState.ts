// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { IAppRootState } from 'app/types';
import { ILoginStore } from 'containers/Login/types';
import { IStockStore } from 'containers/Stock/types';

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  appRootStore?: IAppRootState;
  stockStore?: IStockStore;

  loginStore?: ILoginStore;
}
