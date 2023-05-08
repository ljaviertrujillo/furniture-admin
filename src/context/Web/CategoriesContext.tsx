import {
  Dispatch,
  ElementType,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ICategory, IProduct, ISubCategory } from "../../models";
import { useDispatch } from "react-redux";
import {
  addCategory,
  addSubCategory,
  removeCategory,
  removeSubCategory,
} from "../../redux/states/categories";
import { TbLayoutGridAdd, TbPlaylistAdd } from "react-icons/tb";

interface MenuCategoryItem {
  id: number;
  title: string;
  label: string;
  icon: ElementType;
}

interface CategoriesContextProps {
  menuItems: MenuCategoryItem[];
  categoryIndex: number;
  setCategoryIndex: Dispatch<SetStateAction<number>>;
  categoryMenu: string;
  setCategoryMenu: Dispatch<SetStateAction<string>>;
  newCategory: (category: ICategory) => void;
  deleteCategory: (category: ICategory) => void;
  newSubCategory: (subCategory: ISubCategory) => void;
  deleteSubcategory: (subCategory: ISubCategory) => void;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
  menuItems: [],
  categoryIndex: 0,
  setCategoryIndex: function(): void {},
  categoryMenu: "categories",
  setCategoryMenu: function (): void {},
  newCategory: function (category: ICategory): void {},
  deleteCategory: function (category: ICategory): void {},
  newSubCategory: function (subCategory: ISubCategory): void {},
  deleteSubcategory: function (subCategory: ISubCategory): void {},
});

export default function CategoriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const [categoryMenu, setCategoryMenu] = useState<string>("categories");
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const menuItems: MenuCategoryItem[] = [
    {
      id: 0,
      title: "categories",
      label: "Categorias",
      icon: TbLayoutGridAdd,
    },
    {
      id: 1,
      title: "subcategories",
      label: "SubCategorias",
      icon: TbPlaylistAdd,
    },
  ];

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

  return (
    <CategoriesContext.Provider
      value={{
        menuItems,
        categoryIndex,
        setCategoryIndex,
        categoryMenu,
        setCategoryMenu,
        newCategory,
        deleteCategory,
        newSubCategory,
        deleteSubcategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
