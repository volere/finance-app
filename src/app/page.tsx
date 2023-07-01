import {
  Button,
  VStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Alert,
} from "@chakra-ui/react";
import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [error, setError] = useState<string>();

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    // Assuming `fileInput` is a file input HTML element
    const file = uploadedFile;

    // Check the file extension
    const extension = file.name.split(".").pop();
    if (extension !== "csv") {
      alert("Invalid file type. Please upload a CSV file.");
      return;
    }

    // Check the MIME type
    if (file.type !== "text/csv") {
      alert("Invalid file type. Please upload a CSV file.");
      return;
    }

    // Check the file size (limiting to 5MB in this example)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("The file is too large. Please upload a file smaller than 5MB.");
      return;
    }

    // Perform client-side check
    if (file && file.type !== "text/csv") {
      setError("Invalid file format. Please upload a .csv file.");
    } else {
      setFile(uploadedFile);
    }
  };

  const onFileUpload = () => {
    if (file) {
      // TODO: Implement the file upload logic here
      console.log(file);
      alert("File uploaded successfully");
    }
  };

  return (
    <VStack spacing={8} width="sm" mx="auto" mt={12}>
      <Box
        borderWidth={1}
        borderRadius="md"
        p={6}
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Text fontSize="2xl" mb={4}>
          Upload a CSV file
        </Text>
        <FormControl id="file-upload">
          <FormLabel>Choose file</FormLabel>
          <Input type="file" onChange={onFileChange} mb={4} />
          {error && <Alert status="error">{error}</Alert>}
          <Button colorScheme="teal" onClick={onFileUpload} mt={4}>
            Upload
          </Button>
        </FormControl>
      </Box>
    </VStack>
  );
};

export default FileUpload;
