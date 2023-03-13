import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { advertReducer } from "./advertreducer";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
import { historyReducer } from "./historyReducers";
import imageReducer from "./imageReducer";
import messageReducer from "./messageReducer";
import myTenatsReducer from "./myTenantsReducer";
import { orderReducer } from "./orderReducer";
import propertyReducer from "./propertyReducer";
import searchAdvertsReducer from "./searchAdverts";
import searchReducer from "./searchReducer";
import tenantReducer from "./tenantReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tenants: tenantReducer,
  search: searchReducer,
  history: historyReducer,
  orders: orderReducer,
  msg: messageReducer,
  myTenants: myTenatsReducer,
  properties: propertyReducer,
  admin: adminReducer,
  advert: advertReducer,
  images: imageReducer,
  articles: articleReducer,
  searchAdvert: searchAdvertsReducer,
});

export default rootReducer;
