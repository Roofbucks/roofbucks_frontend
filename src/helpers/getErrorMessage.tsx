export const getErrorMessage = ({ error, message }) => {
  const msg = (error?.response?.data?.error ?? message).split(":");
  return msg.length > 1 ? msg[1].trim() : msg[0];
};
