/* const validationLogin = (email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const minPassword = 6;
  return !(regexEmail.test(email) && password > minPassword);
};

export default validationLogin; */

export const validationEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(email);
};

export const validationPassword = (password) => {
  const minPassword = 6;
  return password.length > minPassword;
};
