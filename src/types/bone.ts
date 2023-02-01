export enum BoneCategory {
  FLAT_BONE = "Flat bone",
  IRREGULAR_BONE = "Irregular bone",
  LONG_BONE = "Long bone",
  SHORT_BONE = "Short bone",
}

export enum BoneBodyPart {
  HEAD = "Head",
  VERTEBRAL_COLUMN = "Vertebral column",
  RIB_CAGE = "Rib cage",
  LIMBS = "Limbs",
}

export interface IBone {
  bodyPart: string;
  category: string;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  owner: string;
  updatedAt: string;
}
