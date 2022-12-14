import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Result } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
  deleted_at: null | string;
}

const endpointUrl = "/categories";

const deleteCategoryMutation = (category: Category) => {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
};

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Result, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: "u1cj89ddd-d8f8-4f8f-b8f8-d8f8d8f8f8f8",
  name: "Horror",
  description: "This is a description for category 1",
  is_active: true,
  deleted_at: null,
  created_at: "2020-01-01T00:00:00.000Z",
  updated_at: "2020-01-01T00:00:00.000Z",
};

const categories = [
  category,
  {
    ...category,
    id: "u1cj79ddd-d7f7-4f7f-b7f7-d7f7d7f7f7f7",
    name: "Romance",
    description: "This is a description for category 2",
    is_active: false,
  },
  {
    ...category,
    id: "u1cj99ddd-d9f9-4f9f-b9f9-d9f9d9f9f9f9",
    name: "Comedy",
    description: "This is a description for category 3",
  },
];

const categorySlice = createSlice({
  name: "categories",
  initialState: categories,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) =>
  state.categories.find((category) => category.id === id) || {
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  };

export const { createCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
