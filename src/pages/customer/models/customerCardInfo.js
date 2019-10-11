import { getCustomerCardDetail } from '../services/customer';

export default {
  namespace: 'customerCardInfo',

  state: {
    grInfo: {},
    inviteInfo: {},
  },

  effects: {
    *getCustomerCardDetail({ payload }, { call, put }) {
      const response = yield call(getCustomerCardDetail, payload);
      if (!response) return;
      const { resultCode, result, resultMsg } = response;
      if (resultCode === '0') {
        const { grInfo = {}, inviteInfo = {} } = result;
        yield put({
          type: 'save',
          payload: {
            grInfo,
            inviteInfo,
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
