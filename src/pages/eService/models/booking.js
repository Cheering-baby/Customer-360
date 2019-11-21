export default {
  namespace: 'eServiceBooking',

  state: {},

  effects: {},

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    resetState(state, { payload }) {
      return {
        ...state,
        offerType: undefined,
        ...payload,
      };
    },
  },
};
