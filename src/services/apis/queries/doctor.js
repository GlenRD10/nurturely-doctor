import { gql } from '@apollo/client';

export const getDoctorByPhone = gql`
  query GET_DOCTOR_BY_PHONE($phone: String) {
    doctor(where: { phone: { _eq: $phone } }) {
      phone
      name
      aboutMe
      clinicAddress
      clinicName
      consultationFee
      createdAt
      email
      id
      region
    }
  }
`;
