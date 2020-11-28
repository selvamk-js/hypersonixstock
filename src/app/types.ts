import { IUserData } from 'containers/Login/types';

export interface IToast {
  toastMessage: string;
  toastType: string;
}
export interface IAppRootState {
  toast: IToast;
  accessToken: string | undefined;
  globalLoader: boolean;
  toastVisible: boolean;
  splashLoad: boolean;
  employeeData: IEmployeeRes[];
  userInfo: IUserData;
}

export interface IEmployeeRes {
  employee_name: string;
  employee_salary: string;
  id: string;
  employee_age: string;
  profile_image: string;
}

export interface IAuthContextType {
  signIn: (data: string) => Promise<void>;
  signOut: () => void;
}

export type ContainerState = IAppRootState;
