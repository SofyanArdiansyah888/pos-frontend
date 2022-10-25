import { gql } from "@apollo/client";

export const CREATE_PRINTER_MUTATION = gql`
mutation createPrinter($input: CreatePrinterInput!){
  createPrinter(createPrinterInput:$input){
    id
  }
}
`;

export const LIST_PRINTER_QUERY = gql`
  query printers($filter:FindPrinterInput!){
  printers(findPrinterInput:$filter){
    id
    name
    description
    ipAddress
  }
}
`;

export const UPDATE_PRINTER_MUTATION = gql`
mutation updatePrinter($input: UpdatePrinterInput!){
  updatePrinter(updatePrinterInput:$input){
    id
  }
}
`;

export const DELETE_PRINTER_MUTATION = gql`
mutation deletePrinter($input:DeletePrinterInput!){
  deletePrinter(id:$input){
    id
  }
}
`;
