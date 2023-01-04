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
    removeAppointment: (state, action) => {
      state.splice(
        state.findIndex((item) => item.id === action.payload),
        1
      );
    },
    approveAppointment: (state, action) => {},
  },
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice.reducer;
