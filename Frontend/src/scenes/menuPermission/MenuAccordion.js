// MenuAccordion.js
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const renderMenuItem = (item) => (
  <Accordion key={item.menu_id}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel-${item.menu_id}-content`}
      id={`panel-${item.menu_id}-header`}
    >
      <Typography>
        <span>{item.icon}</span> {item.name}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{item.description}</Typography>
      {item.children.length > 0 && (
        <div>
          {item.children.map(renderMenuItem)}
        </div>
      )}
    </AccordionDetails>
  </Accordion>
);

const MenuAccordion = ({ menus }) => {
  return <div>{menus.map(renderMenuItem)}</div>;
};

export default MenuAccordion;