import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/ui/ui-slice';
import registrationReducer from './features/registration/registrationSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        registration: registrationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
