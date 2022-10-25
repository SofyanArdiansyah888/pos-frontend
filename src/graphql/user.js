import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const LIST_USER_QUERY = gql`
  query users {
    users {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
    }
  }
`;

export const DELETE_USER_QUERY = gql`
  mutation deleteUser($input:DeleteUserInput!){
  deleteUser(id:$input){
    id
  }
}
`;
