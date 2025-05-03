import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import { useNavigate } from 'react-router';
import axios from "axios";
import { errorAlert, successAlert, months } from "../../utils.js";
import { GET_BOUGHT_PACKAGE_BY_ID, GET_SITE_BY_CUSTOMER_ID, MAKE_CUSTOMER_PAYMENT, SEARCH_CUSTOMER_BY_USER } from "../../EndPoints";
import { useSelector } from "react-redux";

export default function CustomerInstallment() {

  const navigate = useNavigate();
  const theme = useTheme();
  const loggedUser = useSelector((state) => state.user);

  const [customerSites, setCustomerSites] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    customerId: "",
    siteId: "",
    month: "",
    amount: "0",
    description: "",
  });

  const handleChange = (field, value) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const loadSites = async (customerId) => {
    axios
      .get(GET_SITE_BY_CUSTOMER_ID + customerId, {})
      .then((response) => {
        setCustomerSites(response.data);
      })
      .catch((error) => {
        console.log(error);
        // errorAlert("An error Occured");
        errorAlert(error.response.data.message);
      });
  };

  const loadProfile = async () => {
    axios
      .get(SEARCH_CUSTOMER_BY_USER + loggedUser._id, {})
      .then((response) => {
        handleChange('customerId', response.data.customerId)
        loadSites(response.data.customerId);
      })
      .catch((error) => {
        errorAlert(error.response.data.message);
      });
  };

  useEffect(() => {
    loadProfile();
  }, [navigate]);

  const handleSiteChange = (siteId) => {
    handleChange('siteId', siteId);
    const site = customerSites.find(site => site.siteId === siteId);
    axios
      .get(GET_BOUGHT_PACKAGE_BY_ID + site.packageId)
      .then((response) => {
        console.log(response.data);
        handleChange('amount', response.data.cost)
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(MAKE_CUSTOMER_PAYMENT, paymentDetails)
      .then((response) => {
        setPaymentDetails({
          customerId: "",
          siteId: "",
          month: "",
          amount: "0",
          description: "",
        });
        loadProfile();
        successAlert("Payment Success");
      })
      .catch((error) => {
        console.log(error);
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
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Pay Installment
        </Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="cusId"
          label="Customer Id"
          name="cusId"
          autoComplete="cusId"
          autoFocus
          disabled
          value={paymentDetails.customerId}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id="siteId"
          label="Site Id"
          name="siteId"
          autoComplete="siteId"
          value={paymentDetails.siteId}
          onChange={(e) => handleSiteChange(e.target.value)}
        >
          {Object.values(customerSites).map((site) => (
            <MenuItem key={site.siteId} value={site.siteId}>
              {site.siteId}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id="month"
          label="Month"
          name="month"
          autoComplete="amount"
          value={paymentDetails.month}
          onChange={(e) => handleChange('month', e.target.value)}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>{month}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="amount"
          label="Amount"
          name="amount"
          autoComplete="amount"
          value={paymentDetails.amount}
          disabled
        />
      </Grid>

      <Grid item md={12}>
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          value={paymentDetails.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Grid>

      <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
        Pay
      </Button>
    </Grid>
  );
}