/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBoneInput = {
  id?: string | null;
  name: string;
  image: string;
  category: string;
  bodyPart: string;
};

export type ModelBoneConditionInput = {
  name?: ModelStringInput | null;
  image?: ModelStringInput | null;
  category?: ModelStringInput | null;
  bodyPart?: ModelStringInput | null;
  and?: Array<ModelBoneConditionInput | null> | null;
  or?: Array<ModelBoneConditionInput | null> | null;
  not?: ModelBoneConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Bone = {
  __typename: "Bone";
  id: string;
  name: string;
  image: string;
  category: string;
  bodyPart: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateBoneInput = {
  id: string;
  name?: string | null;
  image?: string | null;
  category?: string | null;
  bodyPart?: string | null;
};

export type DeleteBoneInput = {
  id: string;
};

export type ModelBoneFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  image?: ModelStringInput | null;
  category?: ModelStringInput | null;
  bodyPart?: ModelStringInput | null;
  and?: Array<ModelBoneFilterInput | null> | null;
  or?: Array<ModelBoneFilterInput | null> | null;
  not?: ModelBoneFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelBoneConnection = {
  __typename: "ModelBoneConnection";
  items: Array<Bone | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionBoneFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  image?: ModelSubscriptionStringInput | null;
  category?: ModelSubscriptionStringInput | null;
  bodyPart?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionBoneFilterInput | null> | null;
  or?: Array<ModelSubscriptionBoneFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type CreateBoneMutationVariables = {
  input: CreateBoneInput;
  condition?: ModelBoneConditionInput | null;
};

export type CreateBoneMutation = {
  createBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateBoneMutationVariables = {
  input: UpdateBoneInput;
  condition?: ModelBoneConditionInput | null;
};

export type UpdateBoneMutation = {
  updateBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteBoneMutationVariables = {
  input: DeleteBoneInput;
  condition?: ModelBoneConditionInput | null;
};

export type DeleteBoneMutation = {
  deleteBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetBoneQueryVariables = {
  id: string;
};

export type GetBoneQuery = {
  getBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListBonesQueryVariables = {
  filter?: ModelBoneFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListBonesQuery = {
  listBones?: {
    __typename: "ModelBoneConnection";
    items: Array<{
      __typename: "Bone";
      id: string;
      name: string;
      image: string;
      category: string;
      bodyPart: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateBoneSubscriptionVariables = {
  filter?: ModelSubscriptionBoneFilterInput | null;
  owner?: string | null;
};

export type OnCreateBoneSubscription = {
  onCreateBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateBoneSubscriptionVariables = {
  filter?: ModelSubscriptionBoneFilterInput | null;
  owner?: string | null;
};

export type OnUpdateBoneSubscription = {
  onUpdateBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteBoneSubscriptionVariables = {
  filter?: ModelSubscriptionBoneFilterInput | null;
  owner?: string | null;
};

export type OnDeleteBoneSubscription = {
  onDeleteBone?: {
    __typename: "Bone";
    id: string;
    name: string;
    image: string;
    category: string;
    bodyPart: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};
