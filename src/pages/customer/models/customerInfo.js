import { getCustomerDetail } from '../services/customer';

export default {
  namespace: 'customerInfo',

  state: {
    searchInput: undefined,
    customerInfoDetail: {},
  },

  effects: {
    *getCustomerDetail({ payload }, { call, put }) {
      const response = yield call(getCustomerDetail, payload);
      if (!response) return;
      const { resultCode, result, resultMsg } = response;
      if (resultCode === '0') {
        const { customerInfo = {} } = result;
        yield put({
          type: 'save',
          payload: {
            customerInfoDetail: customerInfo,
          },
        });
      } else throw resultMsg;
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
