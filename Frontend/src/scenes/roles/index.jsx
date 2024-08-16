import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Grid,
} from '@mui/material';
import { Add, Edit, Delete, AddCircle, RemoveCircle } from '@mui/icons-material';
import useRoleStore from '../../store/roleStore';

const RoleManagement = () => {
  const { roles, loading, error, fetchRoles, addRole, updateRole, deleteRole } = useRoleStore();
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: '', featurePermissions: [] });
  const [isEditMode, setIsEditMode] = useState(false);
  console.log("ROLES", roles);
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleOpen = () => {
    setIsEditMode(false);
    setCurrentRole({ name: '', featurePermissions: [] });
    setOpen(true);
  };

  const handleEdit = (role) => {
    setIsEditMode(true);
    setCurrentRole({ ...role, featurePermissions: role.featurePermissions || [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (isEditMode) {
      updateRole(currentRole._id, currentRole);
    } else {
      addRole(currentRole);
    }
    setOpen(false);
  };

  const handleAddFeature = () => {
    setCurrentRole({
      ...currentRole,
      featurePermissions: [...currentRole.featurePermissions, { feature: '', permissions: [] }],
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeaturePermissions = [...currentRole.featurePermissions];
    newFeaturePermissions.splice(index, 1);
    setCurrentRole({ ...currentRole, featurePermissions: newFeaturePermissions });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeaturePermissions = [...currentRole.featurePermissions];
    newFeaturePermissions[index][field] = value;
    setCurrentRole({ ...currentRole, featurePermissions: newFeaturePermissions });
  };

  const handlePermissionChange = (index, permission) => {
    const newFeaturePermissions = [...currentRole.featurePermissions];
    const permissions = newFeaturePermissions[index].permissions;
    if (permissions.includes(permission)) {
      newFeaturePermissions[index].permissions = permissions.filter((p) => p !== permission);
    } else {
      newFeaturePermissions[index].permissions = [...permissions, permission];
    }
    setCurrentRole({ ...currentRole, featurePermissions: newFeaturePermissions });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
        Add Role
      </Button>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Name</TableCell>
                <TableCell>Feature</TableCell>
                <TableCell>Read</TableCell>
                <TableCell>Write</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles && Array.isArray(roles) && roles.map((role) => (
                
                role.featurePermissions.map((fp, index) => (
                  <TableRow key={`${role._id}-${fp.feature}`}>
                    {index === 0 && (
                      <TableCell rowSpan={role.featurePermissions.length}>{role.name}</TableCell>
                    )}
                    <TableCell>{fp.feature}</TableCell>
                    <TableCell>
                      <Checkbox checked={fp.permissions.includes('read')} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={fp.permissions.includes('write')} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={fp.permissions.includes('delete')} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={fp.permissions.includes('update')} disabled />
                    </TableCell>
                    {index === 0 && (
                      <TableCell rowSpan={role.featurePermissions.length}>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(role)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteRole(role._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Role Name"
            fullWidth
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
          />
          {currentRole.featurePermissions.map((fp, index) => (
            <Box key={index} mb={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    label="Feature"
                    fullWidth
                    value={fp.feature}
                    onChange={(e) => handleFeatureChange(index, 'feature', e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Box display="flex" justifyContent="space-between">
                    <Checkbox
                      checked={fp.permissions.includes('read')}
                      onChange={() => handlePermissionChange(index, 'read')}
                    />
                    <Checkbox
                      checked={fp.permissions.includes('write')}
                      onChange={() => handlePermissionChange(index, 'write')}
                    />
                    <Checkbox
                      checked={fp.permissions.includes('delete')}
                      onChange={() => handlePermissionChange(index, 'delete')}
                    />
                    <Checkbox
                      checked={fp.permissions.includes('update')}
                      onChange={() => handlePermissionChange(index, 'update')}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button variant="outlined" startIcon={<AddCircle />} onClick={handleAddFeature}>
            Add Feature
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
