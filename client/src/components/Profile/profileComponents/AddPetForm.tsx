import React, { useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

interface PetForm {
  petName: string;
  petImage: string;
  petAge: string;
  petDescription: string;
}

interface PetFormErrors {
  petName: string;
  petImage: string;
  petAge: string;
  petDescription: string;
}

export default function AddPetForm() {
  const [petForm, setPetForm] = useState<PetForm>({
    petName: "",
    petImage: "",
    petAge: "",
    petDescription: "",
  });

  const [errors, setErrors] = useState<PetFormErrors>({
    petName: "",
    petImage: "",
    petAge: "",
    petDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetForm({ ...petForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetForm({ ...petForm, petImage: reader.result as string });
        setErrors({...errors, petImage: ""})
        console.log(petForm)
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
    if (!petForm.petAge || isNaN(Number(petForm.petAge)) || Number(petForm.petAge) <= 0) {
      formErrors.petAge = "Valid pet age is required.";
    }
    if (!petForm.petDescription) {
      formErrors.petDescription = "Pet description is required.";
    }

    if (petForm.petDescription.length > 200) {
      formErrors.petDescription = "Pet description is too long";
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
      console.log('Form submitted:', petForm);
      alert('Pet added successfully!');
      // Reset form
      setPetForm({
        petName: "",
        petImage: "",
        petAge: "",
        petDescription: "",
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="upload-image"
          name='petImage'
          onChange={handleFileChange}
        />
        <label htmlFor="upload-image">
          <CardMedia
            component="img"
            height="140"
            image={petForm.petImage || "https://via.placeholder.com/345x140"}
            alt="Pet Image"
            className="max-h-[220px] min-w-[345px] min-h-[220px]"
            style={{ cursor: 'pointer' }}
          />
          {errors.petImage && <p className='text-red-500 text-center text-[.8rem] mt-[.2rem]'>{errors.petImage}</p>}
        </label>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="petName"
              name="petName"
              value={petForm.petName}
              onChange={handleChange}
              error={!!errors.petName}
              helperText={errors.petName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="petAge"
              name="petAge"
              type="number"
              value={petForm.petAge}
              onChange={handleChange}
              error={!!errors.petAge}
              helperText={errors.petAge}
              margin="normal"
            />
            <TextField
              fullWidth
              label="petDescription"
              name="petDescription"
              multiline
              rows={4}
              value={petForm.petDescription}
              onChange={handleChange}
              error={!!errors.petDescription}
              helperText={errors.petDescription}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full mt-2"
            >
              Add Pet
            </Button>
            {Object.keys(errors).length > 0 && (
              <Alert severity="error" className="mt-2">
                Please fix the errors above.
              </Alert>
            )}
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
