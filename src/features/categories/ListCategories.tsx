import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCategories,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

export default function ListCategories() {
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const categories = useAppSelector(selectCategories);
  const { enqueueSnackbar } = useSnackbar();

  const destroyCategory = async (id: string) => {
    await deleteCategory({ id });
  };

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted", { variant: "success" });
    }

    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Failed during tentative to delete a Category", {
        variant: "error",
      });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  const rows: GridRowsProp = categories.map(
    ({ id, name, description, created_at, is_active }) => ({
      id,
      name,
      description,
      is_active,
      created_at: new Date(created_at).toLocaleDateString("pt-BR"),
    })
  );

  const renderNameCell = (row: GridRenderCellParams) => {
    return (
      <Link
        to={`/categories/edit/${row.id}`}
        style={{ textDecoration: "none" }}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  };

  const renderIsActiveCell = ({ value }: GridRenderCellParams) => {
    return (
      <Typography color={value ? "primary" : "secondary"}>
        {value ? "Active" : "Inactive"}
      </Typography>
    );
  };

  const renderActionsCell = ({ value }: GridRenderCellParams) => {
    return (
      <IconButton color="secondary" onClick={() => destroyCategory(value)}>
        <DeleteIcon />
      </IconButton>
    );
  };

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterPropos: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      renderCell: renderActionsCell,
    },
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

      <Box sx={{ height: 500, display: "flex" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={componentsProps}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
        />
      </Box>
    </Box>
  );
}
