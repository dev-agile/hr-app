// ShowEmployee.tsx
import * as React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField, ImageField, ShowProps } from 'react-admin';

const ShowEmployee: React.FC<ShowProps> = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="role" />
            <NumberField source="salary" />
            <TextField source="qualification" />
            <ImageField source="photo" />
            <ImageField source="qualificationPhoto" />
        </SimpleShowLayout>
    </Show>
);

export default ShowEmployee;
