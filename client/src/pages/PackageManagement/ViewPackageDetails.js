import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert, successAlert } from '../../utils';
import { Grid, Container, Card, CardMedia, CardContent, CardActions, Button, Checkbox, Paper } from '@mui/material';
import { BUY_PACKAGE, SEARCH_PACKAGE_ADDON, SEARCH_PACKAGE_BY_ID } from "../../EndPoints";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { SEARCH_CUSTOMER_BY_USER } from '../../EndPoints';

import { useSelector } from 'react-redux';


const ViewPackageDetails = ({ packageId }) => {

  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  const [addOnsDetails, setAddOnsDetails] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  const [addOns, setAddOns] = useState([]);

  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState([]);
  const [duration, setDuration] = useState("");
  const [mcost, setCost] = useState("");
  const [cusId, setCusId] = useState("");
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  const [customerDetails, setCustomerDetails] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    no: "",
    street: "",
    city: "",
    companyName: "",
    businessType: "",
    mobileNo: "",
    email: "",
  });

  const getCustomerDetails = async () => {
    await axios
      .get(SEARCH_CUSTOMER_BY_USER + loggedUser._id, {})
      .then((response) => {
        const customer = response.data;
        setCusId(customer.customerId);
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setStreet(customer.street);
        setCity(customer.city);
        setMobileNo(customer.mobileNo);
        setEmail(customer.email);
        setCustomerDetails({
          customerId: customer.customerId,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          nic: customer.nic,
          no: customer.no,
          street: customer.street,
          city: customer.city,
          companyName: customer.companyName,
          businessType: customer.businessType,
          mobileNo: customer.mobileNo,
          email: customer.email,
        });
      })
      .catch((error) => {
        errorAlert(error.response.data.message);
      });
  }

  useEffect(() => {
    getCustomerDetails();
  }, [navigate]);

  const handleBuy = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      navigate("/login");
    } else {
      getCustomerDetails();
      await axios
        .post(BUY_PACKAGE, {
          name: packageName,
          price: price,
          description: description,
          duration: duration,
          cusId: cusId,
          cost: mcost,
        })
        .then((res) => {
          successAlert("Package Buy Successfull");
          navigate('/report', { state: { description, cusId, packageName, price, duration, mcost, image, firstName, lastName, street, city, mobileNo, email } })
        })
        .catch((error) => {
          console.log("Error while adding a new package:", error);
          // errorAlert("An error occurred while adding the package. Please try again.");
          errorAlert(error.response.data.message);
        });
    }
  };

  const loadAddons = async () => {
    axios
      .get(SEARCH_PACKAGE_ADDON, {})
      .then((response) => {
        setAddOnsDetails(response.data);
      })
      .catch((error) => {
        // errorAlert("Error Loading Package Addons");
        errorAlert(error.response.data.message);
      });
  };

  useEffect(() => {
    const loadPackages = async () => {
      axios
        .get(SEARCH_PACKAGE_BY_ID + packageId, {})
        .then((response) => {

          setPackageDetails(response.data);
          setPackageName(response.data.name);
          setPrice(response.data.price);
          setDuration(response.data.duration);
          setCost(response.data.cost);
          setImage(response.data.homeImage);
        })
        .catch((error) => {
          console.log(error);
          // errorAlert("Error searching packages by id");
          errorAlert(error.response.data.message);
        });
    };
    loadPackages();
  }, [packageId]);

  const handleAddOns = () => {
    loadAddons();
    setAddOnsOpen(true);
  };

  const handleAddOnChange = (event, row) => {

    const isChecked = event.target.checked;
    const addOnId = row._id;

    if (isChecked) {
      setAddOns([...addOns, addOnId]);
      calculateCustomization(1, row);
    } else {
      setAddOns(addOns.filter((id) => id !== addOnId));
      calculateCustomization(0, row);
    }
  };



  const calculateCustomization = (operation, row) => {
    let price = packageDetails.price;
    let duration = parseInt(packageDetails.duration.match(/\d+/)[0]);
    let cost = packageDetails.cost;

    let aPrice = row.price;
    let aDuration = parseInt(row.duration.match(/\d+/)[0]);
    let rowDescription = row.description;

    let newPrice, newDuration, newCost;

    if (operation == 1) {
      newPrice = price + aPrice;
      newDuration = duration + aDuration;
      newCost = cost + (aPrice / newDuration);
      setDescription(prevDuration => [...prevDuration, rowDescription]);

    } else if (operation == 0) {
      newPrice = price - aPrice;
      newDuration = duration - aDuration;
      newCost = cost - (aPrice / duration);
      const newDescription = description.filter(item => item !== rowDescription);
      setDescription(newDescription);
    }

    packageDetails.price = newPrice;
    packageDetails.duration = newDuration + " months";
    packageDetails.cost = Math.round(newCost);

    setPrice(newPrice);
    setDuration(newDuration + " months");
    setCost(Math.round(newCost));

  };

  return (
    <Grid container>
      <Container style={{ minHeight: "300px" }} >
        <Card sx={{ display: 'flex', mt: 10 }} >
          <CardMedia
            component="img"
            sx={{ width: 450 }}
            image={packageDetails.homeImage}
            alt={packageDetails.name}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2">
              {packageDetails.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {packageDetails.description}
            </Typography>
            <Typography variant="body1">
              Duration: {packageDetails.duration}
            </Typography>
            <Typography variant="body1">
              Price: {` Rs. ${packageDetails.price}.00`}
            </Typography>
            <Typography variant="body1">
              Cost: {` Rs. ${packageDetails.cost}.00`}
            </Typography>
            <CardActions sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Box sx={{ display: "flex", width: "100%", marginBottom: '1em' }}>
                <Button variant="contained" onClick={handleAddOns} sx={{ width: "150px", marginLeft: 2 }}>
                  Add Ons
                </Button>
                <Button variant="contained" onClick={handleBuy} sx={{ width: "150px", marginLeft: 2 }}>
                  Buy Package
                </Button>
              </Box>
              <div >
                {addOnsOpen && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell>Duration</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {addOnsDetails.map((row) => (
                          <TableRow key={row._id}>

                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>{row.price}</TableCell>

                            <TableCell>
                              {<Checkbox onChange={(e) => handleAddOnChange(e, row)} />}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                    </Table>
                  </TableContainer>
                )}

              </div>

            </CardActions>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default ViewPackageDetails;