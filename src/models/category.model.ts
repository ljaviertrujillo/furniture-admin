import { IProduct } from "./products.model";

export interface ISubCategory {
  id: string;
  title: string;
  image: string;
  description: string;
  products: IProduct[];
  categoryId: string
  isNew: true;
  isUpdated: false;

}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  subCategories: ISubCategory[];
  isNew: true;
  isUpdated: false;
}
