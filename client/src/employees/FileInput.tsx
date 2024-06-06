import * as React from 'react';
import { useInput, FieldTitle, InputProps, useNotify } from 'react-admin'; // Import necessary hooks from react-admin
import { InputLabel, Button } from '@mui/material';
import { useState, useEffect } from 'react';

interface FileInputProps extends InputProps {
    source: string;
    label?: string;
}

const FileInput: React.FC<FileInputProps> = ({ source, label, ...rest }) => {
    const {
        field: { onChange },
        fieldState: { error },
        formState: { touched },
    } = useInput({ source, ...rest });

    const notify = useNotify(); // Get the notify function from react-admin

    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState<File | null>(null); // Store the uploaded file

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFileName(uploadedFile.name);
            setFile(uploadedFile); // Set the file in state
            onChange(uploadedFile); // Pass the file to the react-admin input handler
        }
    };

    useEffect(() => {
        const uploadFile = async () => {
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                    // Make API call to upload the file
                    const response = await fetch(`${import.meta.env.VITE_SIMPLE_REST_URL}/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error('File upload failed');
                    }
                    notify('File uploaded successfully'); // Display success notification
                } catch (error) {
                    notify('Error uploading file'); // Display error notification
                }
            }
        };

        uploadFile(); // Call the uploadFile function when file state changes
    }, [file, notify]);

    return (
        <div>
            <InputLabel>{label || <FieldTitle source={source} />}</InputLabel>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id={`${source}-file-input`}
            />
            <label htmlFor={`${source}-file-input`}>
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
                {fileName && <span style={{ marginLeft: '10px' }}>{fileName}</span>}
            </label>
            {touched && error && <span>{error.message}</span>}
        </div>
    );
};

export default FileInput;
