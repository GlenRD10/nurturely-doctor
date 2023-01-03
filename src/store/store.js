import { configureStore } from '@reduxjs/toolkit';

import doctorReducer from './doctor';
import appointmentReducer from './appointment';

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    appointments: appointmentReducer,
  },
});
