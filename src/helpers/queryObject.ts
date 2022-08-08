export const queryObject = (val) => {
  if (!val) return {}
  const objs = val.replace("?", "").split("&");
  const newObj = objs.reduce((item, key) => Object.assign({ ...item, [key.split("=")[0]]: key.split("=")[1] }), {});
  return newObj;
};
