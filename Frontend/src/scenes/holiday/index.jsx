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
  useTheme
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import { toast } from "react-toastify";
import useHolidayStore from "../../store/holidayStore"; // Import the Zustand store
import { tokens } from "../../theme";

const Holiday = () => {
  const { holidays, fetchHolidays, addHoliday, updateHoliday, deleteHoliday, loading } = useHolidayStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    try {
      await deleteHoliday(holidayId);
      toast.success("Holiday deleted successfully");
    } catch (error) {
      toast.error("Failed to delete holiday");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentHoliday({});
  };

  const handleDialogSubmit = async () => {
    try {
      if (isEditMode) {
        await updateHoliday(currentHoliday);
        toast.success("Holiday updated successfully");
      } else {
        await addHoliday({
          ...currentHoliday,
          createdBy: 0,
          updatedBy: 0,
        });
        toast.success("Holiday added successfully");
      }
      setOpenDialog(false);
      setCurrentHoliday({});
    } catch (error) {
      toast.error("Failed to save holiday");
    }
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
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          startIcon={<Add />}
          onClick={handleAddClick}
        >
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
        <TableContainer
          sx={{
            backgroundColor: colors.primary[400],
            "& .MuiTableCell-root": {
              borderBottom: "none",
            },
            "& .MuiTableHead-root": {
              backgroundColor: colors.blueAccent[700],
            },
          }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort("name")} sx={{ cursor: 'pointer' }}>
                  Name {sortConfig.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("date")} sx={{ cursor: 'pointer' }}>
                  Date {sortConfig.key === "date" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("description")} sx={{ cursor: 'pointer' }}>
                  Description {sortConfig.key === "description" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("type")} sx={{ cursor: 'pointer' }}>
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

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
        >
          {isEditMode ? "Edit Holiday" : "Add Holiday"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={currentHoliday.name || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, name: e.target.value })}
            sx={{
              "& .MuiInputBase-root": {
                color: colors.grey[100],
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentHoliday.date || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, date: e.target.value })}
            sx={{
              "& .MuiInputBase-root": {
                color: colors.grey[100],
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={currentHoliday.description || ""}
            onChange={(e) => setCurrentHoliday({ ...currentHoliday, description: e.target.value })}
            sx={{
              "& .MuiInputBase-root": {
                color: colors.grey[100],
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel sx={{ color: colors.grey[100] }}>Type</InputLabel>
            <Select
              value={currentHoliday.type || ""}
              onChange={(e) => setCurrentHoliday({ ...currentHoliday, type: e.target.value })}
              sx={{
                "& .MuiSelect-select": {
                  color: colors.grey[100],
                },
                "& .MuiPaper-root": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiMenuItem-root": {
                  backgroundColor: colors.primary[400],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                  },
                },
              }}
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