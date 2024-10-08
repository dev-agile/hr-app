import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { AppBar, Box, Button, Container, Paper, Toolbar, Typography } from '@mui/material';
import { Oval } from 'react-loader-spinner';
import { useTheme } from '@mui/material/styles';
import useRoleStore from '../../store/roleStore';
import useMenuStore from '../../store/menuStore';
import MenuItem from './MenuItem';

const RoleDropdown = () => {
  const theme = useTheme();
  const { roles, fetchRoles, loading: roleLoading, error: roleError } = useRoleStore();
  const { menus, fetchUserMenus, loading: menuLoading, error: menuError, fetchMenus, createUserMenu } = useMenuStore();

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState({});

  useEffect(() => {
    fetchRoles();
    fetchMenus();
  }, [fetchRoles, fetchMenus]);

  const roleOptions = roles.map((role) => ({
    value: role.role_id,
    label: role.name,
  }));

  const handleRoleChange = async (selectedOption) => {
    const roleId = selectedOption ? selectedOption.value : null;
    setSelectedRole(selectedOption);

    if (roleId) {
      const response = await fetchUserMenus(roleId);
      const menuData = response;

      const newSelectedMenuItems = {};
      menuData.forEach((parentMenu) => {
        newSelectedMenuItems[parentMenu.menu_id] = true;
        parentMenu.children.forEach((childMenu) => {
          newSelectedMenuItems[childMenu.menu_id] = true;
        });
      });

      setSelectedMenuItems(newSelectedMenuItems);
    }
  };

  const handleCheckboxChange = (childId, parentId) => {
    setSelectedMenuItems((prevState) => {
      const newState = {
        ...prevState,
        [childId]: !prevState[childId],
      };

      if (newState[childId]) {
        newState[parentId] = true;
      } else {
        const parent = menus.find(menu => menu.menu_id === parentId);
        if (parent && parent.children.every(child => !newState[child.menu_id])) {
          newState[parentId] = false;
        }
      }

      return newState;
    });
  };

  const handleSubmit = () => {
    console.log('Selected Role:', selectedRole);
    const selectedMenus = Object.keys(selectedMenuItems).filter(id => selectedMenuItems[id]);
    console.log('Selected Menu Items:', selectedMenus);
    createUserMenu(selectedRole.value, selectedMenus);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.common.white }}>
            Role Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: '30px', marginTop: '30px', borderRadius: '12px', backgroundColor: theme.palette.background.paper }}>
          {(roleLoading || menuLoading) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <Oval color={theme.palette.primary.main} height={80} width={80} />
            </Box>
          )}
          {!roleLoading && !menuLoading && (
            <>
              {roleError && <Typography variant="body1" color="error">{roleError}</Typography>}
              {!roleError && (
                <Select
                  options={roleOptions}
                  placeholder="Select a role"
                  isClearable
                  isSearchable
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      margin: '0 auto',
                      borderColor: theme.palette.divider,
                      borderRadius: '8px',
                      minHeight: '48px',
                      fontSize: '16px',
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    }),
                    menu: (provided) => ({
                      ...provided,
                      margin: '0 auto',
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: theme.palette.text.primary,
                    }),
                  }}
                  menuPortalTarget={document.body}
                  onChange={handleRoleChange}
                  value={selectedRole}
                />
              )}

              {menuError && <Typography variant="body1" color="error">{menuError}</Typography>}
              {!menuError && menus.length > 0 && (
                <Box sx={{ marginTop: '30px' }}>
                  {menus.map((parentMenu) => (
                    <MenuItem
                      key={parentMenu.menu_id}
                      parentMenu={parentMenu}
                      selectedMenuItems={selectedMenuItems}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))}
                </Box>
              )}

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{
                  marginTop: '30px',
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Update
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default RoleDropdown;
