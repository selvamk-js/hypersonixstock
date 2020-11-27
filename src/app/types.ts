export interface IToast {
  toastMessage: string;
  toastType: string;
}
export interface IAppRootState {
  toast: IToast;
  accessToken: string;
  globalLoader: boolean;
  toastVisible: boolean;
  employeeData: IEmployeeRes[];
}

export interface IEmployeeRes {
  employee_name: string;
  employee_salary: string;
  id: string;
  employee_age: string;
  profile_image: string;
}

export type ContainerState = IAppRootState;
