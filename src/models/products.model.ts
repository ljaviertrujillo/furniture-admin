export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  dimensions: Dimension;
  material: Material;
  categoryId: string;
  subCategoryId: string;
  isNew: true;
  isUpdated: false;
}

export interface Dimension {
  height: number;
  width: number;
  depth: number;
}

export interface Material {
  metal: MaterialType[];
  wood: MaterialType[];
}

export interface MaterialColor {
  name: string;
  hex: string;
}

export interface MaterialType {
  type: string[];
  colors: MaterialColor[] | null;
  finish: string[];
}
