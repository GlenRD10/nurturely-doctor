import { gql } from '@apollo/client';

export const addDoctor = gql`
  mutation MyMutation(
    $aboutMe: String
    $clinicAddress: String
    $clinicName: String
    $consultationFee: Int
    $email: String
    $name: String
    $phone: String
    $region: String
  ) {
    insert_doctor_one(
      object: {
        aboutMe: $aboutMe
        clinicAddress: $clinicAddress
        clinicName: $clinicName
        consultationFee: $consultationFee
        email: $email
        name: $name
        phone: $phone
        region: $region
      }
    ) {
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
    }
  }
`;
