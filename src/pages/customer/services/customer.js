import axios from 'axios';
import request from '@/utils/request';
import axiosWrapper from '@/utils/axiosWrapper';

// eslint-disable-next-line prefer-destructuring
const CancelToken = axios.CancelToken;
const mock =
  'http://dev-easymock.c85eaf0d05d04465a81befded3f4f608b.cn-shenzhen.alicontainer.com/mock/5f2a8b56f8436f0020822edb/cxm';
const dev = 'http://dev.c85eaf0d05d04465a81befded3f4f608b.cn-shenzhen.alicontainer.com';
const rwsUrl = process.env.NODE_ENV === 'development' ? mock : window.location.origin;

// export async function getCustomerList(params) {
//   return request(`${rwsUrl}/rwscxm/api/v1/customer/profile/get_customers_list`, {
//     method: 'POST',
//     data: params,
//   });
// }

export async function getCustomerList(params) {
  return axiosWrapper.post(`${rwsUrl}/rwscxm/api/v1/customer/profile/get_customers_list`, params);
}

export async function getCustomerDetail(params) {
  return request(`${rwsUrl}/rwscxm/api/v1/customer/profile/customers_detail`, {
    method: 'GET',
    params,
  });
}

export async function getCustomerCardDetail(params) {
  return request(`${rwsUrl}/rwscxm/api/v1/customer/profile/customers_card_detail`, {
    method: 'GET',
    params,
  });
}

export async function getOperationLogInfo(params) {
  return request(`${rwsUrl}/rwscxm/api/v1/hotel/hotelLog/getOperationLogInfo`, {
    method: 'POST',
    data: params,
  });
}
