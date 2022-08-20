import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCategories, Category } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export default function ListCategories() {
  const categories = useAppSelector(selectCategories);

  const rows: GridRowsProp = categories.map(
    ({ id, name, description, created_at }) => ({
      id,
      name,
      description,
      created_at,
    })
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns}></DataGrid>
      </div>

      {categories.map((category) => (
        <Typography key={category.id}>{category.name}</Typography>
      ))}
    </Box>
  );
}
