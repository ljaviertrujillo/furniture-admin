export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  favorite: boolean;
  images: string[];
  dimensions: IDimension;
  material: IMaterial;
  reviews: IReview[];
  categoryId: string;
  subCategoryId: string;
}

export interface IReview {
  id: string;
  user: string;
  date: Date;
  rating: number;
  comments: string;
  images?: string[];
}

export interface IDimension {
  height: number;
  width: number;
  depth: number;
}

export interface IMaterial {
  metal: IMaterialType[];
  wood: IMaterialType[];
}

export interface IMaterialColor {
  name: string,
  hex: string
}

export interface IMaterialType {
  type: string[];
  colors: IMaterialColor[] | null
  finish: string[];
}
