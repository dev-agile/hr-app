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
import { Add, Edit, Delete } from "@mui/icons-material";
import useHolidayStore from "../../store/holidayStore"; // Import the Zustand store

const Holiday = () => {
  const { holidays, fetchHolidays, addHoliday, updateHoliday, deleteHoliday, loading } = useHolidayStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

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

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Holiday Management
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add Holiday
      </Button>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holidays.map((holiday) => (
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
              <MenuItem value="Private">Private</MenuItem>
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
