import { getCustomerList } from '../services/customer';

// eslint-disable-next-line prefer-destructuring
const takeLatest = { type: 'takeLatest' };
export default {
  namespace: 'searchCustomer',

  state: {
    searchInput: undefined,
    customerInfo: [],
  },

  effects: {
    getCustomerList: [
      // eslint-disable-next-line func-names
      function*({ payload }, { call, put }) {
        const response = yield call(getCustomerList, payload);
        if (!response) return;
        const { resultCode, result, resultMsg } = response.data;
        if (resultCode === '0') {
          const {
            customerList: { customerInfo = [] },
          } = result;
          customerInfo.forEach((item, index) => {
            customerInfo[index].key = index;
          });
          yield put({
            type: 'save',
            payload: {
              customerInfo,
            },
          });
        } else throw resultMsg;
      },
      takeLatest,
    ],
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
