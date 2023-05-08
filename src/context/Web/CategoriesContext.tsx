import {
  Dispatch,
  ElementType,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { addCategory, removeCategory } from "../../redux/states/categories";
import { TbLayoutGridAdd, TbPlaylistAdd } from "react-icons/tb";
import {
  addSubCategory,
  removeSubCategory,
} from "../../redux/states/subcategories";
import { Category, SubCategory } from "../../models";

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
  newCategory: (category: Category) => void;
  deleteCategory: (category: Category) => void;
  newSubCategory: (subCategory: SubCategory) => void;
  deleteSubcategory: (subCategory: SubCategory) => void;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
  menuItems: [],
  categoryIndex: 0,
  setCategoryIndex: function (): void {},
  categoryMenu: "categories",
  setCategoryMenu: function (): void {},
  newCategory: function (category: Category): void {},
  deleteCategory: function (category: Category): void {},
  newSubCategory: function (subCategory: SubCategory): void {},
  deleteSubcategory: function (subCategory: SubCategory): void {},
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

  const newCategory = (category: Category) => {
    dispatch(addCategory(category));
  };

  const deleteCategory = (category: Category) => {
    dispatch(removeCategory(category.id));
  };

  const newSubCategory = (subCategory: SubCategory) => {
    dispatch(addSubCategory(subCategory));
  };

  const deleteSubcategory = (subCategory: SubCategory) => {
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
