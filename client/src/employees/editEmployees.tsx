// EditEmployee.tsx
import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, EditProps } from 'react-admin';

const EditEmployee: React.FC<EditProps> = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="role" />
            <NumberInput source="salary" />
            <TextInput source="qualification" />
            <TextInput source="photo" />
            <TextInput source="qualificationPhoto" />
        </SimpleForm>
    </Edit>
);

export default EditEmployee;
