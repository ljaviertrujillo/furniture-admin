import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../models";

export interface CategoryState {
  data: ICategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSucess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeCategory: (state, action) => {
      return {
        ...state,
        data: state.data.filter((category) => category.id !== action.payload),
      };
    },
    addSubCategory: (state, action) => {
      const categoryIndex = state.data.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      if (categoryIndex !== -1) {
        state.data[categoryIndex] = {
          ...state.data[categoryIndex],
          subCategories: [
            ...state.data[categoryIndex].subCategories,
            action.payload,
          ],
        };
      }
    },
    updateSubCategory: (state, action) => {
      const { categoryId, subCategoryId, updatedSubcategory } = action.payload;
      const categoryIndex = state.data.findIndex(
        (category) => category.id === categoryId
      );
      if (categoryIndex !== -1) {
        const subCategoryIndex = state.data[
          categoryIndex
        ].subCategories.findIndex(
          (subCategory) => subCategory.id === subCategoryId
        );
        if (subCategoryIndex !== -1) {
          state.data[categoryIndex].subCategories[subCategoryIndex] = {
            ...state.data[categoryIndex].subCategories[subCategoryIndex],
            ...updatedSubcategory,
          };
        }
      }
    },
    removeSubCategory: (state, action) => {
      const categoryIndex = state.data.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      if (categoryIndex !== -1) {
        const subCategoryIndex = state.data[
          categoryIndex
        ].subCategories.findIndex(
          (subCategory) => subCategory.id === action.payload.id
        );
        if (subCategoryIndex !== -1) {
          state.data[categoryIndex].subCategories = state.data[
            categoryIndex
          ].subCategories.filter(
            (subCategory) => subCategory.id !== action.payload.id
          );
        }
      }
    },
    addProduct: (state, action) => {
      const categoryIndex = state.data.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      if (categoryIndex !== -1) {
        const subCategoryIndex = state.data[
          categoryIndex
        ].subCategories.findIndex(
          (subCategory) => subCategory.id === action.payload.subCategoryId
        );
        if (subCategoryIndex !== -1) {
          state.data[categoryIndex].subCategories[subCategoryIndex] = {
            ...state.data[categoryIndex].subCategories[subCategoryIndex],
            products: [
              ...state.data[categoryIndex].subCategories[subCategoryIndex]
                .products,
              action.payload,
            ],
          };
        }
      }
    },
    updateProduct: (state, action) => {
      const { categoryId, subCategoryId, productId, updatedProduct } =
        action.payload;
      const categoryIndex = state.data.findIndex(
        (category) => category.id === categoryId
      );
      if (categoryIndex !== -1) {
        const subCategoryIndex = state.data[
          categoryIndex
        ].subCategories.findIndex(
          (subcategory) => subcategory.id === subCategoryId
        );
        if (subCategoryIndex !== -1) {
          const productIndex = state.data[categoryIndex].subCategories[
            subCategoryIndex
          ].products.findIndex((product) => product.id === productId);
          if (productIndex !== -1) {
            state.data[categoryIndex].subCategories[subCategoryIndex].products[
              productIndex
            ] = {
              ...state.data[categoryIndex].subCategories[subCategoryIndex]
                .products[productIndex],
              ...updatedProduct,
            };
          }
        }
      }
    },
    removeProduct: (state, action) => {
      const categoryIndex = state.data.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      if (categoryIndex !== -1) {
        const subCategoryIndex = state.data[
          categoryIndex
        ].subCategories.findIndex(
          (subcategory) => subcategory.id === action.payload.subCategoryId
        );
        if (subCategoryIndex !== -1) {
          state.data[categoryIndex].subCategories[subCategoryIndex].products =
            state.data[categoryIndex].subCategories[
              subCategoryIndex
            ].products.filter((product) => product.id !== action.payload.id);
        }
      }
    },
  },
});

export const {
  fetchStart,
  fetchSucess,
  fetchError,
  addCategory,
  updateCategory,
  removeCategory,
  addSubCategory,
  updateSubCategory,
  removeSubCategory,
  addProduct,
  updateProduct,
  removeProduct,
} = categorySlice.actions;

export default categorySlice.reducer;
