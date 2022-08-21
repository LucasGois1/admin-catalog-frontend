import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Category, createCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function CreateCategory() {
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(createCategory(categoryState));
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
            <Typography variant="h4">New Category</Typography>
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
