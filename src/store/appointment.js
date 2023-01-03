import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointments',

  initialState: [],
  reducers: {
    setAppointments: (state, action) => {
      action.payload.map((appointment) => {
        if (!state.find((item) => item.id === appointment.id)) {
          state.push(appointment);
        }
      });
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice.reducer;
