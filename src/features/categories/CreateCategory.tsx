import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function CreateCategory() {
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (event: any) => {
    console.log("changing");
    console.log(event);
  };

  const handleSwitch = () => {
    setIsDisabled(!isDisabled);
    category.is_active = isDisabled;
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
          category={category}
          isDisabled={isDisabled}
          handleChange={handleChange}
          handleSwitch={handleSwitch}
          onSubmit={() => {
            console.log("submiting");
          }}
        />
      </Paper>
    </Box>
  );
}
