import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MenuItem = ({ parentMenu, selectedMenuItems, handleCheckboxChange }) => {
  const theme = useTheme();

  return (
    <Box
      key={parentMenu.menu_id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        padding: '15px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        }}
      >
        {parentMenu.name}
      </Typography>
      <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!selectedMenuItems[parentMenu.menu_id]}
              onChange={() => handleCheckboxChange(parentMenu.menu_id, parentMenu.menu_id)}
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label={parentMenu.name}
          sx={{
            color: theme.palette.text.primary,
          }}
        />
        {parentMenu.children.map((childMenu) => (
          <FormControlLabel
            key={childMenu.menu_id}
            control={
              <Checkbox
                checked={!!selectedMenuItems[childMenu.menu_id]}
                onChange={() => handleCheckboxChange(childMenu.menu_id, parentMenu.menu_id)}
                sx={{
                  color: theme.palette.secondary.main,
                  '&.Mui-checked': {
                    color: theme.palette.secondary.main,
                  },
                }}
              />
            }
            label={childMenu.name}
            sx={{
              color: theme.palette.text.secondary,
              marginLeft: '20px',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MenuItem;
