import { queryProjectNotice } from '../services/api';

export default {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      //const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload:[],
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};
