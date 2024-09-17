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

//? redux
import { useUploadPetMutation } from "@/redux/apiSlices/petsApi";

interface PetForm {
  petName: string;
  petImage: string;
  // petAge: string;
  petDescription: string;
  petType: string;
}

interface PetFormErrors {
  petName: string;
  petImage: string;
  // petAge: string;
  petDescription: string;
  petType: string;
}

interface petFormProps {
  setShowPetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddPetForm({ setShowPetForm }: petFormProps) {
  const [uploadPet, { data, isLoading, isError, error }] =
    useUploadPetMutation();

  const [petForm, setPetForm] = useState<PetForm>({
    petName: "",
    petImage: "",
    // petAge: "",
    petDescription: "",
    petType: "",
  });

  const [errors, setErrors] = useState<PetFormErrors>({
    petName: "",
    petImage: "",
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

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPetForm({ ...petForm, petType: e.target.value as string });
    setErrors({ ...errors, petType: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetForm({ ...petForm, petImage: reader.result as string });
        setErrors({ ...errors, petImage: "" });
        console.log(petForm);
      };
      reader.readAsDataURL(file);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors as PetFormErrors);
    } else {
      // Handle form submission (e.g., send data to backend)
      uploadPet(petForm);
      console.log(data)
      // Reset form
      setPetForm({
        petName: "",
        petImage: "",
        // petAge: "",
        petDescription: "",
        petType: "",
      });
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
            image={petForm.petImage || "https://via.placeholder.com/345x140"}
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
