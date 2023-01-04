import { gql } from '@apollo/client';

export const deleteAppointmentById = gql`
  mutation DELETE_APPOINTMENT_BY_ID($id: uuid!) {
    delete_appointment_by_pk(id: $id) {
      id
    }
  }
`;
