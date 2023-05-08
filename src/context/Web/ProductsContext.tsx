import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Product } from "../../models";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../redux/states/products";

interface ProductContextProps {
  categoryIndex: number;
  setCategoryIndex: Dispatch<SetStateAction<number>>;
  subCategoryIndex: number;
  setSubCategoryIndex: Dispatch<SetStateAction<number>>;
  newProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextProps>({
  categoryIndex: 0,
  setCategoryIndex: function (): void {},
  subCategoryIndex: 0,
  setSubCategoryIndex: function (): void {},
  newProduct: function (product: Product): void {},
  deleteProduct: function (product: Product): void {},
});

export default function ProductsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState<number>(0);

  const newProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  const deleteProduct = (product: Product) => {
    dispatch(removeProduct(product));
  };

  const editProduct = () => {
    console.log("edit");
  };

  return (
    <ProductContext.Provider
      value={{
        categoryIndex,
        subCategoryIndex,
        setCategoryIndex,
        setSubCategoryIndex,
        newProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
