/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBone = /* GraphQL */ `
  subscription OnCreateBone(
    $filter: ModelSubscriptionBoneFilterInput
    $owner: String
  ) {
    onCreateBone(filter: $filter, owner: $owner) {
      id
      name
      image
      category
      bodyPart
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBone = /* GraphQL */ `
  subscription OnUpdateBone(
    $filter: ModelSubscriptionBoneFilterInput
    $owner: String
  ) {
    onUpdateBone(filter: $filter, owner: $owner) {
      id
      name
      image
      category
      bodyPart
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBone = /* GraphQL */ `
  subscription OnDeleteBone(
    $filter: ModelSubscriptionBoneFilterInput
    $owner: String
  ) {
    onDeleteBone(filter: $filter, owner: $owner) {
      id
      name
      image
      category
      bodyPart
      createdAt
      updatedAt
      owner
    }
  }
`;
