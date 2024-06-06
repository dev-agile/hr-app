import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  ListProps,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';

const CustomList: React.FC<ListProps> = (props) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number|string):void => {
    navigate(`/employees/${id}`);
  };

  return (
    <List {...props}>
      <Datagrid rowClick={(id):void => handleRowClick(id)}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="role" />
        <TextField source="salary" />
        <TextField source="qualification" />
        <ImageField source="photo" title="name" />
        <ImageField source="qualificationPhoto" title="qualification" />
      </Datagrid>
    </List>
  );
};

export default CustomList;
