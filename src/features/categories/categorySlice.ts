import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
  deleted_at: null | string;
}

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
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
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

export default categorySlice.reducer;
