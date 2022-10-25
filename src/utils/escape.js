/* eslint-disable no-useless-escape */
// eslint-disable-next-line func-names
const escape = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

export default escape;
