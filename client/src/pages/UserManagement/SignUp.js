import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  TextField,
  useTheme,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import { CREATE_CUSTOMER } from '../../EndPoints';
import axios from 'axios';
import { errorAlert } from "../../utils.js";

export default function Signup() {

  const navigate = useNavigate();
  const theme = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [nic, setNic] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    const oldNicRegex = /^[0-9]{9}[vVxX]$/;
    const newNicRegex = /^\d{12}$/;
    if (!oldNicRegex.test(nic) && !newNicRegex.test(nic)) {
      errorAlert("Please enter a valid NIC number.");
      return;
    }

    const phoneRegex = /^(0|\+94)?[1-9][0-9]{8}$/;
    if (!phoneRegex.test(mobileNo)) {
      errorAlert("Please enter a valid mobile number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorAlert("Please enter a valid email address.");
      return;
    }

    if (password !== cpassword) {
      errorAlert("Password and password confirmation does not match");
      return;
    }

    const newCustomer = {
      firstName,
      lastName,
      dateOfBirth,
      nic,
      no,
      street,
      city,
      companyName,
      businessType,
      mobileNo,
      email,
      password
    };

    axios
      .post(CREATE_CUSTOMER, newCustomer)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
        //navigate("/error");
      });

  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "url(img/login-side-img.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <PersonAddAlt1Icon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoComplete="fname"
              autoFocus
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last name"
              name="lname"
              autoComplete="lname"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              type="date"
              margin="normal"
              required
              fullWidth
              id="dob"
              name="dob"
              autoComplete="dob"
              onChange={(event) => setDateOfBirth(new Date(event.target.value))}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nic"
              label="NIC"
              name="nic"
              autoComplete="nic"
              onChange={(event) => setNic(event.target.value)}
            />
          </Grid>

          <Grid item md={3}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="no"
              label="No"
              name="no"
              autoComplete="no"
              onChange={(event) => setNo(event.target.value)}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="street"
              label="Street"
              name="street"
              autoComplete="street"
              onChange={(event) => setStreet(event.target.value)}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              onChange={(event) => setCity(event.target.value)}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="companyName"
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="businessType"
              label="Business Type"
              name="businessType"
              autoComplete="businessType"
              onChange={(event) => setBusinessType(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobileNo"
              label="Mobile No"
              name="mobileNo"
              autoComplete="mobileNo"
              onChange={(event) => setMobileNo(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="current-password"
              onChange={(event) => setCpassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, width: "50%" }}
        >
          Sign Up
        </Button>
      </Paper>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        &copy; {new Date().getFullYear()} All rights reserved | Apex
      </Typography>
    </Grid>
  );
}
