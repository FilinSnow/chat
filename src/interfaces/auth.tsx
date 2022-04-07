export interface IAuth {
  flag?: boolean;
  setFlag?: (tmp: boolean) => void;
  auth?: boolean | any;
  setAuth?: (tmp: boolean) => void;
  theme?: any;
  setTheme?: any;
}

// export interface IAppRouter extends IAuth {
//   setAuth?: () => void;
// }