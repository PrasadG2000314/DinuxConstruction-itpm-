import React, { useState, useEffect } from "react";
import { TextField, IconButton, Typography, Grid, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses, TablePagination } from "@mui/material";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import UpdateAddOns from "./UpdateAddOns";
import { DELTE_PACKAGE_ADDON, SEARCH_PACKAGE_ADDON } from "../../EndPoints";

function ViewAddOns() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [packageDetails, setPackageDetails] = useState([]);
    const [viewUpdateContent, setViewUpdateContent] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');
    const [discription, setDiscription] = useState('');
    const [filteredPackageDetails, setFilteredPackageDetails] = useState([]);

    useEffect(() => {
        if (discription) {
            const filteredData = packageDetails.filter(pakg => {
                if (pakg.description) {
                    return pakg.description.toLowerCase().includes(discription.toLowerCase());
                }
                return false;
            });
            setFilteredPackageDetails(filteredData);
        } else {
            setFilteredPackageDetails(packageDetails);
        }
    }, [discription, packageDetails]);

    const loadPackages = async () => {
        axios
            .get(SEARCH_PACKAGE_ADDON, {})
            .then((response) => {
                setPackageDetails(response.data);
            })
            .catch((error) => {
                errorAlert("Couldnt Load Packages");
            });
    };

    useEffect(() => {
        loadPackages();
    }, [navigate, viewUpdateContent]);

    const handleDelete = (packageId) => {
        axios
            .delete(DELTE_PACKAGE_ADDON + packageId)
            .then((response) => {
                loadPackages();
                successAlert("Package Deleted");
            })
            .catch((error) => {
                console.log(error);
                // errorAlert("Couldnt Delete");
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
                container
                sx={theme.palette.gridBody}
                spacing={2}
                component="form"
                noValidate>

                <Grid item md={12}>
                    <Typography variant="h5" gutterBottom>
                        Search Add Ons
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="discription"
                        label="Discription"
                        name="discription"
                        autoComplete="discription"
                        autoFocus
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                    />
                </Grid>
            </Grid>

            <Grid container sx={theme.palette.gridBody}>
                <Grid item md={12}>
                    <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>Duration</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPackageDetails.map((row) => (
                                    <StyledTableRow key={row.packageId}>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.duration}</StyledTableCell>
                                        <StyledTableCell>{row.price}</StyledTableCell>
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
                            sx={{ backgroundColor: theme.palette.primary.main }}
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
                <Grid container>
                    <Grid item md={12}>
                        <UpdateAddOns data={selectedRow} submitted={setViewUpdateContent} />
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

export default ViewAddOns;