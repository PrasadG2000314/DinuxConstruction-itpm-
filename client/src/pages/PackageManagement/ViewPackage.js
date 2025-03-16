import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, IconButton, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses, TablePagination } from "@mui/material";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import UpdatePackage from "./UpdatePackage";
import { DELTE_PACKAGE, SEARCH_PACKAGE } from "../../EndPoints";

function ViewPackage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [packageDetails, setPackageDetails] = useState([]);
    const [viewUpdateContent, setViewUpdateContent] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');
    const [packageName, setPackageName] = useState('');
    const [filteredPackageDetails, setFilteredPackageDetails] = useState([]);

    useEffect(() => {
        if (packageName) {
            const filteredData = packageDetails.filter(pkg => pkg.name.toLowerCase().includes(packageName.toLowerCase()));
            setFilteredPackageDetails(filteredData);
        } else {
            setFilteredPackageDetails(packageDetails);
        }
    }, [packageName, packageDetails]);

    const loadPackages = async () => {
        axios
            .get(SEARCH_PACKAGE, {})
            .then((response) => {
                setPackageDetails(response.data);
            })
            .catch((error) => {
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadPackages();
    }, [navigate, viewUpdateContent]);

    const handleDelete = (packageId) => {
        axios
            .delete(DELTE_PACKAGE + packageId)
            .then((response) => {
                loadPackages();
                successAlert("Package Deleted");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const HandleUpdate = (row) => {
        setSelectedRow(row);
        setViewUpdateContent(true);
    }

    //--------------------Table Functions---------------------------------
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

    //-------------------------------Table Functions-----------------------------

    return (
        <Grid>
            <Grid
                container md={12}
                spacing={2}
                component="form"
                sx={theme.palette.gridBody}
                noValidate
            >
                <Grid item md={12}>
                    <Typography variant="h5" gutterBottom>
                        Search Package
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
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                </Grid>
            </Grid>

            <Grid container sx={theme.palette.gridBody}>
                <Grid item md={12}>
                    <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main, }}>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <StyledTableRow>
                                    {/* <TableCell>Package ID</TableCell> */}
                                    {/* <StyledTableCell>PackageId</StyledTableCell> */}
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>Duration</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    {/* <StyledTableCell>Home Image</StyledTableCell>
                        <StyledTableCell>Model Link</StyledTableCell> */}
                                    <StyledTableCell>Payment/Mo</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>


                            <TableBody>
                                {filteredPackageDetails.map((row) => (
                                    <StyledTableRow key={row.packageId}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.duration}</StyledTableCell>
                                        <StyledTableCell>{row.price}</StyledTableCell>
                                        <StyledTableCell>{row.cost}</StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton onClick={() => handleDelete(row._id)}>
                                                <Delete />
                                            </IconButton>
                                            <IconButton onClick={() => HandleUpdate(row)}>
                                                <Edit />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            sx={{ backgroundColor: theme.palette.primary.main, }}
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={packageDetails.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Grid>
            </Grid>
            {viewUpdateContent &&
                <Grid container sx={theme.palette.gridBody}>
                    <Grid item md={12}>
                        <UpdatePackage data={selectedRow} submitted={setViewUpdateContent} />
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}


export default ViewPackage;