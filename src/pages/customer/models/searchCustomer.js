import { getCustomerList } from '../services/customer';

export default {
  namespace: 'searchCustomer',

  state: {
    searchInput: undefined,
    customerInfo: [],
  },

  effects: {
    *getCustomerList({ payload }, { call, put }) {
      const response = yield call(getCustomerList, payload);
      if (!response) return;
      const { resultCode, result, resultMsg } = response;
      if (resultCode === '0') {
        const {
          customerList: { customerInfo = [] },
        } = result;
        customerInfo.forEach((item, index) => {
            customerInfo[index].key = index;
        })
        yield put({
          type: 'save',
          payload: {
            customerInfo,
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
