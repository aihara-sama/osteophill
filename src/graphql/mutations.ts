/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBone = /* GraphQL */ `
  mutation CreateBone(
    $input: CreateBoneInput!
    $condition: ModelBoneConditionInput
  ) {
    createBone(input: $input, condition: $condition) {
      id
      name
      image
      category
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateBone = /* GraphQL */ `
  mutation UpdateBone(
    $input: UpdateBoneInput!
    $condition: ModelBoneConditionInput
  ) {
    updateBone(input: $input, condition: $condition) {
      id
      name
      image
      category
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteBone = /* GraphQL */ `
  mutation DeleteBone(
    $input: DeleteBoneInput!
    $condition: ModelBoneConditionInput
  ) {
    deleteBone(input: $input, condition: $condition) {
      id
      name
      image
      category
      createdAt
      updatedAt
      owner
    }
  }
`;
