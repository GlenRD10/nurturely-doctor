import { gql } from '@apollo/client';

export const getDoctorByPhone = gql`
  query GET_DOCTOR_BY_PHONE($phone: String) {
    doctor(where: { phone: { _eq: $phone } }) {
      id
      phone
    }
  }
`;

export const getDoctorById = gql`
  query GET_DOCTOR_BY_ID($id: uuid!) {
    doctor_by_pk(id: $id) {
      aboutMe
      clinicAddress
      clinicName
      consultationFee
      createdAt
      email
      id
      name
      phone
      region
      appointments {
        id
        dateTime
        description
        status
        user {
          name
          phone
          email
          dateOfBirth
        }
      }
    }
  }
`;
