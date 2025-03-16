import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import storage from "../../Apis/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import { CREATE_PACKAGE } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils.js";
import VisuallyHiddenInput from '../../components/VisuallyHiddenInput.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const AddNewPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [mcost, setCost] = useState("");
  const [homeImage, setHomeImage] = useState("");
  const [modelLink, setModelLink] = useState("model link");
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState();

  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!homeImage) {
      errorAlert("Please choose a file first!");
      return;
    }

    axios
      .post(CREATE_PACKAGE, {
        name: packageName,
        price: price,
        description: description,
        duration: duration,
        homeImage: homeImage,
        modelLink: modelLink,
        cost: mcost,
      })
      .then((res) => {
        setPackageName("");
        setPrice("");
        setDescription("");
        setHomeImage("");
        setModelLink("");
        setCost("");
        setDuration("");
        successAlert("Package Created");
      })
      .catch((error) => {
        console.log("Error while adding a new package:", error);
        // errorAlert("An error occurred while adding the package. Please try again.");
        errorAlert(error.response.data.message);
      });
  };

  // image upload to firebase storage as in previous function
  const onUpload = async (e) => {
    const file = e.target.files[0];

    if (file === null) {
      return;
    }
    const storageRef = ref(storage, `/packages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setHomeImage(url);
        });
      }
    );
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
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
          Add Package
        </Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Package Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={packageName}
          onChange={(e) => {
            const value = e.target.value;

            if (value === '') {
              setPackageName('');
              return;
            }
        
            if (!/^[A-Za-z]+$/.test(value)) {
              return; 
            }
        
            setPackageName(value);
          }}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Package Price"
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

      <Grid item md={16}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="discription"
          label="Package Description"
          name="discription"
          autoComplete="discription"
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
          label="Package Duration"
          name="duration"
          autoComplete="duration"
          value={duration}
          onChange={(e) => 
            setDuration(e.target.value)
          }
        />
      </Grid>



      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="mcost"
          label="Package Monthly Payment"
          name="mcost"
          autoComplete="mcost"
          value={mcost}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setCost('');
              return;
            }

            if (isNaN(value)) {
              return; 
            }

            if (value >= 0) {
              setCost(parseFloat(value));
            }
          }}
        />

      </Grid>

      <Grid item md={4}>
        <img
          width="300"
          src={homeImage}></img>

        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={(e) => onUpload(e)}
        >
          Upload Image
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>

      <Button type="submit" variant="contained" sx={{ ml: 10, mt: 25, width: "50%", height: "10%" }}>
        Create Package
      </Button>

    </Grid>
  );

}

export default AddNewPackage;