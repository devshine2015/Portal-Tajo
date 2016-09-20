const endpoints = {
  login: {
    url: 'login',
    method: 'post',
  },
  logout: {
    url: 'login',
    method: 'delete',
  },
  getGFs: {
    url: 'location',
    method: 'get',
  },
  createGF: {
    url: 'location',
    method: 'post',
  },
  deleteGF: id => ({
    url: `location/${id}`,
    method: 'delete',
  }),
};

export default {
  ...endpoints,
};
