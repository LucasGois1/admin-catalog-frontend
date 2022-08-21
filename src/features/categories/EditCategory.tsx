import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function EditCategory() {
  const id = useParams().id || "";

  const category = useAppSelector((state) => selectCategoryById(state, id));

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
            <Typography variant="h4">Edit Category</Typography>
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
