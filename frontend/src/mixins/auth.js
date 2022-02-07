import jwt from 'jsonwebtoken';

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = jwt.decode(token);
  if (!data) return;
  return date < data.exp;
}

export const AuthMixin = {
  methods: {
    isAuthenticated,
  },
};
