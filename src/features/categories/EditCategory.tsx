import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category, selectCategoryById, updateCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function EditCategory() {
  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(category);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Category updated", { variant: "success" });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCategoryState({
      ...categoryState,
      [name]: value,
    });
  };

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCategoryState({
      ...categoryState,
      [name]: checked,
    });
  };

  return (
    <Box>
      <Paper>
        <Box padding={2}>
          <Box marginBottom={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          handleChange={handleChange}
          handleSwitch={handleSwitch}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
}
