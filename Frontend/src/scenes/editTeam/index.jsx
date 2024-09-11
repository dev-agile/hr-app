import React, { useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import useUserStore from "../../store/userStore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { users, fetchUsers, deleteUser } = useUserStore();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (userId) => {
    console.log("userId: " + userId);
    navigate(`/team/addTeam?user_id=${userId}`); // Navigate to addTeam page with user_id
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      fetchUsers(); // Refresh the list after deletion
    }
  };

  const columns = [
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "email_address", headerName: "Email Address", flex: 1 },
   
    { 
      field: "role", 
      headerName: "Role", 
      flex: 1,
      valueGetter: (params) => params.row.role ? params.row.role.name : 'N/A'
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleEdit(params.row.user_id)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.user_id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="USERS"
        subtitle="Managing the User List"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.user_id}
        />
      </Box>
    </Box>
  );
};

export default UserList;