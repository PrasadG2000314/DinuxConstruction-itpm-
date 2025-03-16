import React, { useState } from "react";
import axios from "axios";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import { errorAlert, successAlert } from "../../utils";
import { UPDATE_PACKAGE_ADDON } from "../../EndPoints";

const UpdateAddOns = ({ data, submitted }) => {
  const [price, setPrice] = useState(data ? data.price : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [duration, setDuration] = useState(data ? data.duration : '');

  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.put(UPDATE_PACKAGE_ADDON, {
      id: data._id,
      price: price,
      description: description,
      duration: duration,

    }).then((response) => {
      submitted(false);
      successAlert("Package Updated");
    }).catch((error) => {
      console.log(error);
      errorAlert(error.response.data.message);
    })
  }

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
        <Typography variant="h5" gutterBottom>
          Upadate Add Ons
        </Typography>
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
          autoFocus
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
          autoFocus
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
          Upadate Add Ons
        </Button>
      </Grid>

    </Grid>
  );
}

export default UpdateAddOns;
