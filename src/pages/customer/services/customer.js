import request from '@/utils/request';

const mock =
  'http://easymock.c85eaf0d05d04465a81befded3f4f608b.cn-shenzhen.alicontainer.com/mock/5cf5d1e19aec4300200d1cfb';
const dev = 'http://dev.c85eaf0d05d04465a81befded3f4f608b.cn-shenzhen.alicontainer.com';
const rwsUrl = process.env.NODE_ENV === 'development' ? mock : window.location.origin;

export async function getCustomerList(params) {
  return request(`${rwsUrl}/rwscxm/api/v1/customer/profile/get_customers_list`, {
    method: 'POST',
    data: params,
  });
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
