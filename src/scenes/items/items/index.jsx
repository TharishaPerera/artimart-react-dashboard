import React, { useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import Header from "../../../components/Header";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // change title
  useEffect(() => {
    document.title = "Listings | ARTIMART";
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "gender", headerName: "GENDER", flex: 0.3 },
    { field: "age", headerName: "AGE", flex: 0.2 },
    { field: "mobile", headerName: "PHONE", flex: 0.3 },
    { field: "telephone", headerName: "TELEPHONE", flex: 0.3 },
    { field: "address", headerName: "ADDRESS", flex: 0.5 },
    { field: "zipCode", headerName: "ZIP CODE", flex: 0.2 },
    {
      field: "role",
      headerName: "ROLE",
      flex: 0.5,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="50%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 0.5,
      disableClickEventBubbling: true,
      renderCell: ({ row: { id } }) => {
        const handleEdit = (e) => {
          e.stopPropagation();
          var base_url = window.location.origin;

          window.location.replace(base_url + "/users/update/" + id);
        };

        const handleDelete = (e) => {
          e.stopPropagation();
          console.log(id);
          alert(id);
        };

        return (
          <>
            <Box>
              <IconButton onClick={handleEdit}>
                <BorderColorIcon
                  sx={{ fontSize: "26p", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={handleDelete}>
                <DeleteOutlineIcon
                  sx={{ fontSize: "26p", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <Header title="Items" subtitle="Item Data" />
      <Box
        m="0 0 5px 5px"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          // Grid Toolbar styles
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataTeam}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Items;
