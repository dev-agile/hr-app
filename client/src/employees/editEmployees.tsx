import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ImageField,
    useNotify,
    useRedirect,
    useRefresh,
} from 'react-admin';
import FileInput from './FileInput';

const EmployeeEdit: React.FC = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const saveImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${process.env.VITE_SIMPLE_REST_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.url; // Assume the server returns the URL of the uploaded image
    };

    const handleSave = async (values: any) => {
        try {
            if (values.photo instanceof File) {
                values.photo = await saveImage(values.photo);
            }
            // Save the form data to the server
            // Your save logic here (e.g., API call to save employee data)
            notify('Employee saved successfully');
            redirect('list', 'employees');
            refresh();
        } catch (error) {
            notify('Error saving employee', { type: 'error' });
        }
    };

    return (
        <Edit {...props}>
            <SimpleForm >
                <TextInput source="name" />
                <TextInput source="role" />
                <TextInput source="salary" />
                <TextInput source="qualification" />
                <FileInput source="photo" label="Photo" />
                <ImageField source="photo" title="Photo" />
            </SimpleForm>
           
        </Edit>
    );
};

export default EmployeeEdit;
