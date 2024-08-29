import React, { useEffect,useState } from "react";
import { Box, TextField, Typography, useTheme, Badge, Menu, MenuItem, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useLeaveStore from "../../store/useLeaveStore";

const Leave = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { leaves, loading, fetchLeaves } = useLeaveStore();

  useEffect(() => {
    fetchLeaves(); // Fetch leaves on component mount
  }, [fetchLeaves]);

  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Filtered data based on search term across multiple fields
  const filteredData = leaves.filter((row) => {
    const searchString = searchTerm.toLowerCase();
    return (
      (row.fullName && row.fullName.toLowerCase().includes(searchString)) ||
      row.status.toLowerCase().includes(searchString) ||
      row.description.toLowerCase().includes(searchString) ||
      row.duration.toString().includes(searchString) ||
      new Date(row.leaveDate).toLocaleDateString().includes(searchString)
    );
  });

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedRow) {
      selectedRow.status = newStatus;
    }
    handleMenuClose();
  };

  const leaveColumns = [
    { field: "_id", headerName: "ID" },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { 
      field: "status", 
      headerName: "Status", 
      flex: 1,
      renderCell: (params) => (
        <Badge 
          badgeContent={params.value} 
          color={params.value === "Pending" ? "warning" : "success"}
          onClick={(event) => handleMenuOpen(event, params.row)}
          sx={{ cursor: 'pointer', marginLeft: 5 }}
        />
      )
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "duration", headerName: "Duration (days)", flex: 1 },
    { 
      field: "leaveDate", 
      headerName: "Leave Date", 
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {new Date(params.row.leaveDate).toLocaleDateString()}
        </Typography>
      )
    }
  ];

  return (
    <Box m="20px">
      <Header title="LEAVE" subtitle="List of Leave Requests" />
      <Box mb="20px">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none", display: 'flex', alignItems: 'center' },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
            "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          }}
        >
          <DataGrid 
            checkboxSelection 
            rows={filteredData} 
            columns={leaveColumns} 
            getRowId={(row) => row._id} 
            sortingOrder={['asc', 'desc']}
          />
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange("Accepted")}>Approve</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Rejected")}>Reject</MenuItem>
      </Menu>
    </Box>
  );
};

export default Leave;