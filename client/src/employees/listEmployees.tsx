import * as React from "react";
import { List, Datagrid, TextField, ImageField,ListProps } from 'react-admin';

const CustomEmployeeList:React.FC<ListProps> = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="role" />
            <TextField source="salary" />
            <TextField source="qualification" />
            <ImageField source="photo" title="Employee Photo" />
            <ImageField source="qualificationPhoto" title="Qualification Photo" />
        </Datagrid>
    </List>
);

export default CustomEmployeeList;
