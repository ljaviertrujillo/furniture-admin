import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ICategory, IProduct, ISubCategory } from "../../models";
import { useDispatch } from "react-redux";
import {
  addCategory,
  addProduct,
  addSubCategory,
  fetchError,
  removeCategory,
  removeProduct,
  removeSubCategory,
} from "../../redux/states/categories";

interface CategoriesContextProps {
  categories: ICategory[];
  newCategory: (category: ICategory) => void;
  deleteCategory: (category: ICategory) => void;
  newSubCategory: (subCategory: ISubCategory) => void;
  deleteSubcategory: (subCategory: ISubCategory) => void;
  newProduct: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
  categories: [],
  newCategory: function (category: ICategory): void {},
  deleteCategory: function (category: ICategory): void {},
  newSubCategory: function (subCategory: ISubCategory): void {},
  deleteSubcategory: function (subCategory: ISubCategory): void {},
  newProduct: function (product: IProduct): void {},
  deleteProduct: function (product: IProduct): void {},
});

export default function CategoriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);

  const categories: ICategory[] = [
    {
      id: "residencial",
      title: "Residencial",
      description: "Descripcion default",
      url: "/categories/residencial",
      image:
        "https://images.squarespace-cdn.com/content/v1/551d8079e4b002dbe2052a92/4661952d-6f8d-445e-870a-d08e3e8a71f2/cama+rec+nogal+2c+2.jpg?format=1000w",
      subCategories: [
        {
          title: "Recamara",
          description: "Todo para tu recamara",
          image:
            "https://images.squarespace-cdn.com/content/v1/551d8079e4b002dbe2052a92/4661952d-6f8d-445e-870a-d08e3e8a71f2/cama+rec+nogal+2c+2.jpg?format=1000w",
          products: [],
        },
      ],
    },
    {
      id: "interiorws",
      title: "Interiores",
      description: "Descripcion default",
      url: "/categories/residencial",
      image:
        "https://images.squarespace-cdn.com/content/v1/551d8079e4b002dbe2052a92/4661952d-6f8d-445e-870a-d08e3e8a71f2/cama+rec+nogal+2c+2.jpg?format=1000w",
      subCategories: [],
    },
  ];

  // const getCategories = () => {};

  const newCategory = (category: ICategory) => {
    dispatch(addCategory(category));
  };

  const deleteCategory = (category: ICategory) => {
    dispatch(removeCategory(category.id));
  };

  const newSubCategory = (subCategory: ISubCategory) => {
    dispatch(addSubCategory(subCategory));
  };

  const deleteSubcategory = (subCategory: ISubCategory) => {
    dispatch(removeSubCategory(subCategory));
  };

  const newProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const deleteProduct = (product: IProduct) => {
    dispatch(removeProduct(product));
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        newCategory,
        deleteCategory,
        newSubCategory,
        deleteSubcategory,
        newProduct,
        deleteProduct,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
