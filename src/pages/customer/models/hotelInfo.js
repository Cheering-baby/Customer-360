import { getOperationLogInfo } from '../services/customer';

export default {
  namespace: 'hotelInfo',

  state: {
    hotelLogInfos: [],
  },

  effects: {
    *getOperationLogInfo({ payload }, { call, put }) {
      const response = yield call(getOperationLogInfo, payload);
      if (!response) return;
      const { resultCode, result, resultMsg } = response;
      if (resultCode === '0') {
        const { hotelLogInfos = [] } = result;
        console.log(result)
        yield put({
          type: 'save',
          payload: {
            hotelLogInfos,
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
