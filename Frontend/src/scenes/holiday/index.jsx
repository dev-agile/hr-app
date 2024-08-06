import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import useHolidayStore from "../../store/holidayStore"; // Import the Zustand store

const Holiday = () => {
  const { holidays, fetchHolidays, addHoliday, updateHoliday, deleteHoliday, loading } = useHolidayStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentHoliday({});
    setOpenDialog(true);
  };

  const handleEditClick = (holiday) => {
    setIsEditMode(true);
    setCurrentHoliday(holiday);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (holidayId) => {
    await deleteHoliday(holidayId);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentHoliday({});
  };

  const handleDialogSubmit = async () => {
    if (isEditMode) {
      await updateHoliday(currentHoliday);
    } else {
      await addHoliday({
        ...currentHoliday,
        createdBy: 0,
        updatedBy: 0,
      });
    }
    setOpenDialog(false);
    setCurrentHoliday({});
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedHolidays = holidays
    .filter((holiday) =>
      holiday.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        if (sortConfig.direction === "ascending") {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
          return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
      }
      return 0;
    });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Holiday Management
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
          Add Holiday
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort("name")} sx={{cursor:'pointer'}}>
                  Name {sortConfig.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("date")} sx={{cursor:'pointer'}}>
                  Date {sortConfig.key === "date" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("description")} sx={{cursor:'pointer'}}>
                  Description {sortConfig.key === "description" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("type")} sx={{cursor:'pointer'}}>
                  Type {sortConfig.key === "type" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedHolidays.map((holiday) => (
                <TableRow key={holiday._id}>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>{holiday.description}</TableCell>
                  <TableCell>{holiday.type}</TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(holiday)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(holiday._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditMode ? "Edit Holiday" : "Add Holiday"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={currentHoliday.name || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentHoliday.date || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={currentHoliday.description || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, description: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={currentHoliday.type || ""}
              onChange={(e) => setCurrentHoliday({ ...currentHoliday, type: e.target.value })}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
              <MenuItem value="Optional">Optional</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Holiday;
