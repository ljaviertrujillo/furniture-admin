import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IProduct } from "../../models";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../redux/states/categories";

interface ProductContextProps {
  categoryIndex: number;
  setCategoryIndex: Dispatch<SetStateAction<number>>;
  subCategoryIndex: number;
  setSubCategoryIndex: Dispatch<SetStateAction<number>>;
  newProduct: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
}

export const ProductContext = createContext<ProductContextProps>({
  categoryIndex: 0,
  setCategoryIndex: function (): void {},
  subCategoryIndex: 0,
  setSubCategoryIndex: function (): void {},
  newProduct: function (product: IProduct): void {},
  deleteProduct: function (product: IProduct): void {},
});

export default function ProductsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
    const dispatch = useDispatch();
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState<number>(0);

  const newProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const deleteProduct = (product: IProduct) => {
    dispatch(removeProduct(product));
  };

  const editProduct = () => {
    console.log('edit')
  }

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
