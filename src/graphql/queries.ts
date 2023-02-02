/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBone = /* GraphQL */ `
  query GetBone($id: ID!) {
    getBone(id: $id) {
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
        category
        bodyPart
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchBones = /* GraphQL */ `
  query SearchBones(
    $filter: SearchableBoneFilterInput
    $sort: [SearchableBoneSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableBoneAggregationInput]
  ) {
    searchBones(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        image
        category
        bodyPart
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
