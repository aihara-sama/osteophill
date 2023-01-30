/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBone = /* GraphQL */ `
  query GetBone($id: ID!) {
    getBone(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
export const listBones = /* GraphQL */ `
  query ListBones(
    $filter: ModelBoneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
