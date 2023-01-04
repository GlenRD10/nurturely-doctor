import { gql } from '@apollo/client';

export const deleteAppointmentById = gql`
  mutation DELETE_APPOINTMENT_BY_ID($id: uuid!) {
    delete_appointment_by_pk(id: $id) {
      id
    }
  }
`;

export const approveAppointmentById = gql`
  mutation APPROVE_APPOINTMENT_BY_ID($id: uuid!) {
    update_appointment_by_pk(
      pk_columns: { id: $id }
      _set: { status: "approved" }
    ) {
      id
    }
  }
`;
