import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, useTheme, Paper, TableRow, styled, TableCell, tableCellClasses, TableContainer, Table, TableHead, TableBody, TablePagination } from "@mui/material";
import axios from "axios";
import { CREATE_SITE, GENERATE_SITE_ID, GET_INAPPROVED_PACKAGES } from "../../EndPoints.js";
import { errorAlert, successAlert } from "../../utils.js";

function AddSite() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [siteDetails, setSiteDetails] = useState({
        siteId: "",
        customerId: "",
        location: "",
        notes: "",
        start: "",
        end: "",
        lastUpdate: "Initiated",
        completeStatus: 0,
        packageId: ""
    });
    const [packages, setPackages] = useState({});
    const [selectedPackage, setSelectedPackage] = useState('');

    const handleChange = (field, value) => {
        setSiteDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const loadSiteId = async () => {
        axios
            .get(GENERATE_SITE_ID, {})
            .then((response) => {
                handleChange('siteId', response.data)
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const loadPackages = async () => {
        axios
            .get(GET_INAPPROVED_PACKAGES, {})
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.log(error);
                // errorAlert("Error getting Inapproved Packages");
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadSiteId();
        loadPackages();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_SITE, siteDetails)
            .then((response) => {
                setSiteDetails({
                    siteId: "",
                    customerId: "",
                    location: "",
                    notes: "",
                    start: "",
                    end: "",
                    lastUpdate: "Initiated",
                    completeStatus: 0,
                    packageId: "",
                });
                loadSiteId();
                loadPackages();
                setSelectedPackage("");
                successAlert("Site Created successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const calculateEndDate = (startDate) => {
        handleChange('start', startDate);

        if (selectedPackage) {

            const duration = selectedPackage.duration;
            const [startYear, startMonth, day] = startDate.split('-').map(Number);
            const [durationValue] = duration.split(' ');
            const endYear = startYear + Math.floor((startMonth + Number(durationValue) - 1) / 12);
            const endMonth = (startMonth + Number(durationValue)) % 12 || 12;
            const end = `${endYear}-${endMonth < 10 ? '0' : ''}${endMonth}-${day < 10 ? '0' : ''}${day}`;
            handleChange('end', end);
        }
    };

    const handleClick = (row) => {
        setSelectedPackage(row);
        handleChange('customerId', row.cusId);
        handleChange('packageId', row._id);
    }
    //------------------------Table Functions--------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.default,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.mainOpacity,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.primary.mainOpacity2,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    //----------------------------------Table Functions-------------------------------------

    return (
        <Grid>
            <Grid
                container
                spacing={2}
                sx={theme.palette.gridBody}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Pending Packages
                    </Typography>
                </Grid>
                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Customer Id</StyledTableCell>
                                <StyledTableCell>Package Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Duration</StyledTableCell>
                                <StyledTableCell>Monthly Cost</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                packages.length > 0 ? packages.map(row => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell>{row.cusId}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.price}</StyledTableCell>
                                        <StyledTableCell>{row.duration}</StyledTableCell>
                                        <StyledTableCell>{row.cost}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button sx={{ margin: '0px 10px' }}
                                                onClick={() => handleClick(row)}
                                            >
                                                Add as Site
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) : (
                                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell>No Data</StyledTableCell>
                                    </StyledTableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                    <TablePagination
                        sx={{ backgroundColor: theme.palette.primary.main, }}
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        count={packages.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>

            {selectedPackage.length != 0 && (
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
                            Add Site Details
                        </Typography>
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="siteId"
                            name="siteId"
                            label="Site Id"
                            autoComplete="siteId"
                            disabled
                            value={siteDetails.siteId}
                        />
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="custId"
                            label="Customer Id"
                            name="custId"
                            autoComplete="custId"
                            value={siteDetails.customerId}
                            onChange={(e) => handleChange('customerId', e.target.value)}
                            disabled
                        />
                    </Grid>

                    <Grid item md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="Location"
                            name="location"
                            autoComplete="location"
                            autoFocus
                            value={siteDetails.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="date"
                            id="start"
                            label="Start Date"
                            name="start"
                            autoComplete="start"
                            value={siteDetails.start}
                            onChange={(e) => calculateEndDate(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="date"
                            id="end"
                            label="Assumed End Date"
                            name="end"
                            autoComplete="end"
                            value={siteDetails.end}
                            onChange={(e) => handleChange('end', e.target.value)}
                            disabled
                        />
                    </Grid>

                    <Grid item md={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="notes"
                            label="Notes"
                            name="notes"
                            autoComplete="notes"
                            value={siteDetails.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lUpdate"
                            label="Last Update"
                            name="lUpdate"
                            autoComplete="lUpdate"
                            value={siteDetails.lastUpdate}
                            disabled
                        />
                    </Grid>

                    <Grid item md={6}>
                        <TextField
                            type="number"
                            margin="normal"
                            required
                            fullWidth
                            id="cStatus"
                            label="Complete Status"
                            name="cStatus"
                            autoComplete="cStatus"
                            value={siteDetails.completeStatus}
                            disabled
                        />
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }}>
                        Add Site
                    </Button>
                </Grid>
            )}

        </Grid>
    );

}

export default AddSite;