import deleteHandler from "./behaviors/deleteHandler.js";
import getHandler from "./behaviors/getHandler.js";
import hasHandler from "./behaviors/hasHandler.js";
import ownKeysHandler from "./behaviors/ownKeysHandler.js";
import setHandler from "./behaviors/setHandler.js";

export default {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  has: hasHandler,
  ownKeys: ownKeysHandler
}