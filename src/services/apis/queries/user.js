import { gql } from '@apollo/client';

const getUserList = gql`
  query GET_USER_LIST($id: uuid!) {
    doctor_by_pk(id: $id) {
      users {
        dateOfBirth
        email
        name
        phone
        region
      }
    }
  }
`;
