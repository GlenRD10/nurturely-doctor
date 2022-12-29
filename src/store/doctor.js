import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',

  //initializing skeleton initial state for better auto-complete
  initialState: {
    __typename: '',
    aboutMe: '',
    clinicAddress: '',
    clinicName: '',
    consultationFee: '',
    createdAt: '',
    email: '',
    id: '',
    name: '',
    phone: '',
    region: '',
  },

  reducers: {
    setDoctor: (state, action) => {
      state.__typename = action.payload.__typename;
      state.aboutMe = action.payload.aboutMe;
      state.clinicAddress = action.payload.clinicAddress;
      state.clinicName = action.payload.clinicName;
      state.consultationFee = action.payload.consultationFee;
      state.createdAt = action.payload.createdAt;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.region = action.payload.region;
    },
  },
});

export const doctorActions = doctorSlice.actions;
export default doctorSlice.reducer;
