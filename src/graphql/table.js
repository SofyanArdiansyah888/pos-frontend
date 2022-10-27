import { gql } from "@apollo/client";

export const CREATE_TABLE_MUTATION = gql`
mutation createTable($input: CreateTableInput!){
  createTable(createTableInput:$input){
    id
  }
}
`;

export const LIST_TABLE_QUERY = gql`
  query tables($filter:FindTableInput!){
  tables(findTableInput:$filter){
    id
    name
    status
    order {
      id
      orderNumber
      paymentAt
      createdAt
  	}
    createdAt
  }
}
`;

export const UPDATE_TABLE_MUTATION = gql`
mutation updateTable($input: UpdateTableInput!){
  updateTable(updateTableInput:$input){
    id
  }
}
`;

export const DELETE_TABLE_MUTATION = gql`
mutation deleteTable($input:DeleteTableInput!){
  deleteTable(id:$input){
    id
  }
}
`;
