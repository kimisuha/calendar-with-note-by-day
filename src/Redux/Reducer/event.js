/* 
this file is a main of reducer, it's store name of slice, init state, reducers method and export them

have 3 reducer, as a name, they add new, remove once and clear once event!
*/

import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
    name: "event",
    initialState: [],
    reducers: {
        addNewEvent: function (state, action) {
            let isExist = -1;

            if (state.length > 0) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i].time === action.payload.time)
                        isExist = i;
                }
            }

            if (isExist === -1) {
                state.push(action.payload);
                alert("success add new note!");
                return state;
            }
            else {
                state[isExist] = action.payload;
                alert("update!");
                return state;
            }
        },
        removeEvent(state, action) {
            let isExist = -1;

            if (state.length > 0) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i].time === action.payload)
                        isExist = i;
                }
            }

            if (isExist !== -1) {
                state.splice(isExist, 1);
                alert("success delete note");
                return state;
            }

            alert("have some error, failue delete note!");
            return state;

        },
        clearEvent(state, action) {
            let isExist = -1;

            if (state.length > 0) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i].time === action.payload)
                        isExist = i;
                }
            }

            if (isExist !== -1) {
                if (state[isExist].title === '') {
                    alert("notthing to clear");
                    return state;
                }
                else {
                    state[isExist].title = '';
                    state[isExist].content = ''
                    alert("success clear note");
                    return state;
                }

            }
        }
    }
});

/* remember alway export all reducer methods to use in another page! */

export const { addNewEvent, removeEvent, clearEvent } = eventSlice.actions;
