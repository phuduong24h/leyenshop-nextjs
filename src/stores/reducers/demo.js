import { createReducer } from '@reduxjs/toolkit';

import { DEMO_ACTION } from 'stores/actions';

const INITIAL_STATE = {};

export default createReducer(INITIAL_STATE, builder => {
  builder.addCase(DEMO_ACTION, (state, action) => {
    return INITIAL_STATE;
  });
  // .addMatcher(
  //   action => [DEMO_ACTION.type].includes(action.type),
  //   (state, action) => {}
  // );
});
