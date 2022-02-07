const hostApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : '';
const portApi = process.env.NODE_ENV === 'development' ? 8080 : '';
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl =
  process.env.NODE_ENV === 'http://localhost:3000/verify-email';

const colors = {
  blue: '#2477FF',
  green: '#2D8515',
  orange: '#E49400',
  red: '#DB2A34',
  purple: '#474D84',
  dark: '#040620',
  teal: '#4179CF',
  pink: '#e671b8',
  gray: '#d6dee5',
  default: '#595d78',
  textColor: '#b4b5bf',
  gridLineColor: '#040620',
};

export default {
  colors: {
    ...colors,
    white: '#fff',
  },
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: 'https://sing-generator-node.herokuapp.com',
  isBackend: process.env.VUE_APP_BACKEND,
  auth: {
    email: 'admin@flatlogic.com',
    password: 'password',
  },
};
