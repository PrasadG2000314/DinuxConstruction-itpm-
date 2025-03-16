import React, { useState } from "react";
import axios from "axios";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import { errorAlert, successAlert } from "../../utils.js";
import { CREATE_PACKAGE_ADDON } from "../../EndPoints";

const AddAddOns = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(CREATE_PACKAGE_ADDON, {
        price: price,
        description: description,
        duration: duration,
      })
      .then((res) => {
        setDescription("");
        setPrice("");
        setDuration("");
        successAlert("AddOns Created");
      })
      .catch((error) => {
        console.log("Error while adding a new add ons:", error);
        // errorAlert("An error occurred while adding the add ons. Please try again.");
        errorAlert(error.response.data.message);
      });
  };


  return (
    <Grid
      container
      spacing={2}
      component="form"
      sx={theme.palette.gridBody}
      noValidate
      onSubmit={onSubmit}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Create Add Ons</Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="discription"
          label="Package Description"
          name="discription"
          autoComplete="discription"
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="duration"
          label="Add Ons Duration"
          name="duration"
          autoComplete="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Add Ons Price"
          name="price"
          autoComplete="price"
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setPrice('');
              return;
            }

            if (isNaN(value)) {
              return; 
            }

            if (value >= 0) {
              setPrice(parseFloat(value));
            }
          }}
        />
      </Grid>
      <Grid item md={7}>
        <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
          Create Add Ons
        </Button>
      </Grid>
    </Grid>
  );

}

export default AddAddOns;