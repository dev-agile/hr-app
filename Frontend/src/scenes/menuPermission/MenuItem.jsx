import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

const MenuItem = ({ parentMenu, selectedMenuItems, handleCheckboxChange }) => (
  <Box key={parentMenu.menu_id} sx={{ display: 'flex', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
    <div style={{ marginRight: '20px', fontWeight: 'bold', minWidth: '100px' }}>{parentMenu.name}</div>
    <Box>
      <FormControlLabel
        control={(
          <Checkbox
            checked={!!selectedMenuItems[parentMenu.menu_id]}
            onChange={() => handleCheckboxChange(parentMenu.menu_id, parentMenu.menu_id)}
          />
        )}
        label={parentMenu.name}
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
);

export default MenuItem;