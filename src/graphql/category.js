import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
mutation createCategory($input: CreateCategoryInput!){
  createCategory(createCategoryInput:$input){
    name
  }
}
`;

export const LIST_CATEGORY_QUERY = gql`
  query categories{
  categories{
    id
    name
  }
}
`;

export const UPDATE_CATEGORY_MUTATION = gql`
mutation updateCategory($input: UpdateCategoryInput!){
  updateCategory(updateCategoryInput:$input){
    id
    name
  }
}
`;

export const DELETE_CATEGORY_MUTATION = gql`
mutation deleteCategory($input:DeleteCategoryInput!){
  deleteCategory(id:$input){
    id
  }
}
`;
