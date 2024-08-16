import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import useRoleStore from '../../store/roleStore';
import useMenuStore from '../../store/menuStore';

const RoleDropdown = () => {
  const { roles, fetchRoles, loading: roleLoading, error: roleError } = useRoleStore();
  const { menus, fetchUserMenus, loading: menuLoading, error: menuError, fetchMenus, createUserMenu } = useMenuStore();

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState({});
  const [selectAll, setSelectAll] = useState({});

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
    setSelectedRole(roleId);
    console.log('Selected Role ID:', roleId);

    if (roleId) {
      const response = await fetchUserMenus(roleId);
      const menuData = response;

      // Update selectedMenuItems to check all checkboxes according to the children
      const newSelectedMenuItems = {};
      menuData.forEach((parentMenu) => {
        parentMenu.children.forEach((childMenu) => {
          newSelectedMenuItems[childMenu.menu_id] = true; // Mark child menu items as selected
        });
      });

      setSelectedMenuItems(newSelectedMenuItems); // Update state with selected menu items
    }
  };

  const handleCheckboxChange = (childId, parentId) => {
    setSelectedMenuItems((prevState) => {
      const newState = {
        ...prevState,
        [childId]: !prevState[childId],
      };

      // If any child is selected, ensure the parent is selected
      if (newState[childId]) {
        newState[parentId] = true;
      } else {
        // If no children are selected, unselect the parent
        const parent = menus.find(menu => menu.menu_id === parentId);
        if (parent && parent.children.every(child => !newState[child.menu_id])) {
          newState[parentId] = false;
        }
      }

      return newState;
    });
  };

  const handleSelectAllChange = (parentId, children) => {
    const newSelectedState = !selectAll[parentId];
    const updatedState = { [parentId]: newSelectedState };

    // Check all child menu IDs
    children.forEach((child) => {
      updatedState[child.menu_id] = newSelectedState;
    });

    // Include parent menu ID even if children are empty
    if (children.length === 0) {
      updatedState[parentId] = newSelectedState;
    }

    setSelectAll((prev) => ({ ...prev, [parentId]: newSelectedState }));
    setSelectedMenuItems((prev) => ({ ...prev, ...updatedState }));
  };

  const handleSubmit = () => {
    console.log('Selected Role:', selectedRole);
    const selectedMenus = Object.keys(selectedMenuItems).filter(id => selectedMenuItems[id]);

    console.log('Selected Menu Items (including parents):', selectedMenus);

    // Ensure that role_id and menuIds are passed correctly
    createUserMenu(selectedRole, selectedMenus);
  };

  return (
    <Box sx={{ position: 'relative', width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      {roleLoading && <p>Loading roles...</p>}
      {roleError && <p>Error: {roleError}</p>}
      {!roleLoading && !roleError && (
        <Select
          options={roleOptions}
          placeholder="Select a role"
          isClearable
          isSearchable
          styles={{
            control: (provided) => ({ ...provided, margin: '0 auto', borderColor: 'lightgray', borderRadius: '4px' }),
            menu: (provided) => ({ ...provided, margin: '0 auto' })
          }}
          menuPortalTarget={document.body}
          onChange={handleRoleChange}
        />
      )}

      {menuLoading && <p>Loading menus...</p>}
      {menuError && <p>Error: {menuError}</p>}
      {!menuLoading && !menuError && menus.length > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          {menus.map((parentMenu) => (
            <Box key={parentMenu.menu_id} sx={{ display: 'flex', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ marginRight: '20px', fontWeight: 'bold', minWidth: '100px' }}>{parentMenu.name}</div>
              <Box>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={!!selectedMenuItems[parentMenu.menu_id]}
                      onChange={() => handleSelectAllChange(parentMenu.menu_id, parentMenu.children)}
                    />
                  )}
                  label="Select All"
                />
                {parentMenu.children.map((childMenu) => (
                  <FormControlLabel
                    key={childMenu.menu_id}
                    control={(
                      <Checkbox
                        checked={!!selectedMenuItems[childMenu.menu_id]}
                        onChange={() => handleCheckboxChange(childMenu.menu_id, parentMenu.menu_id)}
                      />
                    )}
                    label={childMenu.name}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: '20px', width: '100%' }}>Update</Button>
    </Box>
  );
};

export default RoleDropdown;