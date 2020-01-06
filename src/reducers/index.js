import { combineReducers } from "redux";

import me from "./me";
import dataReducers from "./dataReducers";

export default combineReducers({
  me,
  dataReducers
});
