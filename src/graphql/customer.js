import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_MUTATION = gql`
mutation createCustomer($input: CreateCustomerInput!){
  createCustomer(createCustomerInput:$input){
    id
    name
    email
    phone
  }
}
`;

export const LIST_CUSTOMER_QUERY = gql`
  query customers{
  customers{
    id
    name
    email
    phone
    createdAt
  }
}
`;

export const UPDATE_CUSTOMER_MUTATION = gql`
mutation updateCustomer($input: UpdateCustomerInput!){
  updateCustomer(updateCustomerInput:$input){
    id
    name
    email
    phone
  }
}
`;

export const DELETE_CUSTOMER_MUTATION = gql`
mutation deleteCustomer($input:DeleteCustomerInput!){
  deleteCustomer(id:$input){
    id
  }
}
`;
