import { combineReducers } from "redux";

import authReducer from "./authentication.redux";
import appReducer from "./application.redux";

const reducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export default reducer;
