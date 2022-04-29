import { eventSlice } from './Reducer/event';
import { configureStore } from '@reduxjs/toolkit';

/* 
this file config for redux,
have a store, as a name, it's store all thing, reducer, type of state,....
have multiple store but now i using once!
when config is success, let export default as a name
remember: set reducer for use all reducer!
 */
const store =  configureStore({
    reducer: eventSlice.reducer
});

export default store;