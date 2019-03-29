import { queryTags } from '../services/api';

export default {
  namespace: 'monitor',

  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
    //  const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: [],
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
