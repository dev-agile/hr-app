// CreateEmployee.tsx
import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, CreateProps } from 'react-admin';

const CreateEmployee: React.FC<CreateProps> = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="role" />
            <NumberInput source="salary" />
            <TextInput source="qualification" />
            <TextInput source="photo" />
            <TextInput source="qualificationPhoto" />
        </SimpleForm>
    </Create>
);

export default CreateEmployee;
