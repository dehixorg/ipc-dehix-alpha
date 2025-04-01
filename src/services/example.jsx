// apiHelperService.jsx

import { apiService } from './apiService';

import { Api_Methods } from '../utils/common/enum'; // Importing Api_Methods

export const apiHelperService = {
  getAllFreelancers: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/freelancer',
      params,
    });
  },
  getAllAdmin: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/admin',
      params,
    });
  },
  getAllProject: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/project',
      params,
    });
  },
  getAllFaq: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/faq',
      params,
    });
  },
  getAllNotification: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/notification',
      params,
    });
  },
  getAllDomain: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/domain',
      params,
    });
  },
  getAllBusiness: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/business',
      params,
    });
  },
  getAllBid: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/bid',
      params,
    });
  },
  getDomainList: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/domain',
      params,
    });
  },
  getAllBusinessProject: async (itemId) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: `/business/${itemId}/project`,
    });
  },
  getAllBusinessPersonalInfo: async (itemId) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: `/business/${itemId}`,
    });
  },
  getAllFreelancerPersonalInfo: async (itemId) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: `/freelancer/${itemId}`,
    });
  },

  createFaq: async (body) => {
    return apiService({
      method: Api_Methods.POST,
      endpoint: '/faq',
      body,
    });
  },
  createAdmin: async (body) => {
    return apiService({
      method: Api_Methods.POST,
      endpoint: '/admin',
      body,
    });
  },
  createDomain: async (body) => {
    return apiService({
      method: Api_Methods.POST,
      endpoint: '/domain',
      body,
    });
  },

  updateItem: async (itemId, body) => {
    return apiService({
      method: Api_Methods.PUT,
      endpoint: `/items/${itemId}`,
      body,
    });
  },

  deleteAdmin: async (itemId) => {
    return apiService({
      method: Api_Methods.DELETE,
      endpoint: `/admin/${itemId}`,
    });
  },
  deleteFaq: async (itemId) => {
    return apiService({
      method: Api_Methods.DELETE,
      endpoint: `/faq/${itemId}`,
    });
  },
  deleteDomain: async (itemId) => {
    return apiService({
      method: Api_Methods.DELETE,
      endpoint: `/domain/${itemId}`,
    });
  },
  deleteNotification: async (itemId) => {
    return apiService({
      method: Api_Methods.DELETE,
      endpoint: `/notification/${itemId}`,
    });
  },

  patchItem: async (itemId, body) => {
    return apiService({
      method: Api_Methods.PATCH,
      endpoint: `/items/${itemId}`,
      body,
    });
  },

  getCategories: async (params = {}) => {
    return apiService({
      method: Api_Methods.GET,
      endpoint: '/categories',
      params,
    });
  },
};
