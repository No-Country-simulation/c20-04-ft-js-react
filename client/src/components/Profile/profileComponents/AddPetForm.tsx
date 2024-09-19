import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from '@mui/material';

//? redux
import { useUploadPetMutation } from "@/redux/apiSlices/petsApi";

interface PetForm {
  petName: string;
  petImage?: File | null;
  previewUrl: string | null
  // petAge: string;
  petDescription: string;
  petType: string;
}

interface PetFormErrors {
  petName: string;
  petImage: string;
  previewUrl: string
  // petAge: string;
  petDescription: string;
  petType: string;
}

interface petFormProps {
  setShowPetForm: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetch: ()=> void
}

export default function AddPetForm({ setShowPetForm, onRefetch }: petFormProps) {
  const [uploadPet, { data, isLoading, isError, error }] =
    useUploadPetMutation();

  const [petForm, setPetForm] = useState<PetForm>({
    petName: "",
    petImage: null as File | null,
    previewUrl: "",
    // petAge: "",
    petDescription: "",
    petType: "",
  });
  

  const [errors, setErrors] = useState<PetFormErrors>({
    petName: "",
    petImage: "",
    previewUrl: "",
    // petAge: "",
    petDescription: "",
    petType: "",
  });

  const petTypes = [
    "Dog",
    "Cat",
    "Fish",
    "Bird",
    "Rabbit",
    "Hamster",
    "Reptile",
    "Ferret",
    "Horse",
    "Exotic Pet",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPetForm({ ...petForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setPetForm({ ...petForm, petType: e.target.value });
    setErrors({ ...errors, petType: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPetForm({...petForm, petImage: file, previewUrl: previewUrl});
      setErrors({...errors, petImage: '', previewUrl: ""})
    }
  };

  const validateForm = () => {
    let formErrors: Partial<PetFormErrors> = {};
    if (!petForm.petName) {
      formErrors.petName = "Pet name is required.";
    }
    if (petForm.petName.length > 12 || petForm.petName.length < 3) {
      formErrors.petName = "pet name should be between 3 and 12 characters";
    }
    if (!petForm.petImage) {
      formErrors.petImage = "Pet image is required.";
    }
    // if (!petForm.petAge || isNaN(Number(petForm.petAge)) || Number(petForm.petAge) <= 0) {
    //   formErrors.petAge = "Valid pet age is required.";
    // }
    if (!petForm.petDescription) {
      formErrors.petDescription = "Pet description is required.";
    }
    if (petForm.petDescription.length > 200) {
      formErrors.petDescription = "Pet description is too long.";
    }
    if (!petForm.petType) {
      formErrors.petType = "Pet type is required.";
    }
    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors as PetFormErrors);
    } else {
      // Handle form submission (e.g., send data to backend)
      const formData = new FormData();
      formData.append('name', petForm.petName);
      formData.append('description', petForm.petDescription);
      formData.append('species', petForm.petType);
  
      if (petForm.petImage) {
        formData.append('image', petForm.petImage); // Match the field name expected by Multer
      }
      console.log(formData)
      
      try {
        const response = await uploadPet(formData).unwrap();
        console.log(response);
        onRefetch()
        setShowPetForm(false);
      } catch (error) {
        console.log('Error uploading pet:', error);
      }
    }
    
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }} // Hide the file input
          id="upload-image"
          name="petImage"
          onChange={handleFileChange}
        />
        {/* Label triggers the file input */}
        <label htmlFor="upload-image" className="relative">
          <button
            className="absolute top-2 right-2 z-10  bg-black/50 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center"
            onClick={() => setShowPetForm(false)}
          >
            X
          </button>
          <CardMedia
            component="img"
            height="140"
            image={petForm.previewUrl || "https://via.placeholder.com/345x140"}
            alt="Pet Image"
            className="max-h-[220px] min-w-[345px] min-h-[220px]"
            style={{ cursor: "pointer" }}
          />
          {errors.petImage && (
            <p className="text-red-500 text-center text-[.8rem] mt-[.2rem]">
              {errors.petImage}
            </p>
          )}
        </label>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Pet Name"
              name="petName"
              value={petForm.petName}
              onChange={handleChange}
              error={!!errors.petName}
              helperText={errors.petName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pet Description"
              name="petDescription"
              multiline
              rows={4}
              value={petForm.petDescription}
              onChange={handleChange}
              error={!!errors.petDescription}
              helperText={errors.petDescription}
              margin="normal"
            />
            <FormControl fullWidth margin="normal" error={!!errors.petType}>
              <InputLabel id="petType-label">Pet Type</InputLabel>
              <Select
                labelId="petType-label"
                id="petType"
                value={petForm.petType}
                onChange={handleSelectChange}
                label="Pet Type"
              >
                {petTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.petType && (
                <p className="text-red-500">{errors.petType}</p>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full mt-2"
            >
              {isLoading ? "loading" : "add pet"}
            </Button>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
