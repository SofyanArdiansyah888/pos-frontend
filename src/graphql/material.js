import { gql } from "@apollo/client";

export const CREATE_MATERIAL_MUTATION = gql`
mutation createMaterial($input: CreateMaterialInput!){
  createMaterial(createMaterialInput:$input){
    id
  }
}
`;

export const LIST_MATERIAL_QUERY = gql`
query materials($filter:FindMaterialInput!){
  materials(findMaterialInput:$filter){
    id
    name
    stock
    code
    minimalStock
    type
    createdAt
  }
}
`;

export const UPDATE_MATERIAL_MUTATION = gql`
mutation updateMaterial($input: UpdateMaterialInput!){
  updateMaterial(updateMaterialInput:$input){
    id
  }
}
`;

export const DELETE_MATERIAL_MUTATION = gql`
mutation deleteMaterial($input:DeleteMaterialInput!){
  deleteMaterial(id:$input){
    id
  }
}
`;
