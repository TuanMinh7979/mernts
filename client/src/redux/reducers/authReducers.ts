import { AUTH, IAuthType, IAuth } from "../types/authType";

const authReducer = (state: IAuth = {}, action: IAuthType): IAuth => {
  switch (action.type) {
    case AUTH:
      console.log(">>>>>DISPATCH go to here", action.payload);

      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
