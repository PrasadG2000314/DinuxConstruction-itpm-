import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme, TableContainer, TableHead, Table, TableRow, TableBody, TablePagination, styled, tableCellClasses, TableCell, Paper, IconButton } from "@mui/material";
import axios from "axios";
import { CREATE_BILLER, DELETE_BILLER, GET_ALL_BILLERS, GET_BILLER_ID, UPDATE_BILLER } from "../../EndPoints";
import { billerTypes, errorAlert, successAlert } from "../../utils.js";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

function Biller() {
    const [biller, setBiller] = useState('');

    const handleUpdate = (billerData) => {
        setBiller(billerData);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {biller && <UpdateBiller biller={biller} />}
                {!biller && <AddBiller />}
            </Grid>
            <Grid item xs={12}>
                <ViewBiller handleUpdate={handleUpdate} />
            </Grid>
        </Grid>
    );
}

export default Biller;

function AddBiller() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [billerDetails, setBillerDetails] = useState({
        billerId: "",
        type: "",
        name: "",
        bank: "",
        branch: "",
        accountNo: "",
    });

    const handleChange = (field, value) => {
        setBillerDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadBillerId = async () => {
            axios
                .get(GET_BILLER_ID, {})
                .then((response) => {
                    handleChange('billerId', response.data)
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        };

        loadBillerId();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_BILLER, billerDetails)
            .then((response) => {
                setBillerDetails({
                    billerId: "",
                    type: "",
                    name: "",
                    bank: "",
                    branch: "",
                    accountNo: "",
                });
                successAlert("Biller Created Succesfully");
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
                    Add Biller
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="billerId"
                    label="Biller Id"
                    name="billerId"
                    autoComplete="billerId"
                    value={billerDetails.billerId}
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="Biller type"
                    name="type"
                    autoComplete="type"
                    autoFocus
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    {Object.values(billerTypes).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={(e) => handleChange('name', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bank"
                    label="Bank"
                    name="bank"
                    autoComplete="bank"
                    onChange={(e) => handleChange('bank', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    autoComplete="branch"
                    onChange={(e) => handleChange('branch', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountNo"
                    label="Account Number"
                    name="accountNo"
                    autoComplete="accountNo"
                    onChange={(e) => handleChange('accountNo', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Add Biller
            </Button>
        </Grid>
    );

}

function UpdateBiller(billerData) {

    const navigate = useNavigate();
    const theme = useTheme();
    const biller = billerData.biller;

    const [billerDetails, setBillerDetails] = useState({
        billerId: biller.billerId,
        type: biller.type,
        name: biller.name,
        bank: biller.bank,
        branch: biller.branch,
        accountNo: biller.accountNo,
    });

    const handleChange = (field, value) => {
        setBillerDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put(UPDATE_BILLER, billerDetails)
            .then((response) => {
                setBillerDetails({
                    billerId: "",
                    type: "",
                    name: "",
                    bank: "",
                    branch: "",
                    accountNo: "",
                });
                successAlert("Biller Updated Succesfully");
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
                    Update Biller
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="billerId"
                    label="Biller Id"
                    name="billerId"
                    autoComplete="billerId"
                    value={billerDetails.billerId}
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="Biller type"
                    name="type"
                    autoComplete="type"
                    autoFocus
                    value={billerDetails.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    {Object.values(billerTypes).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={billerDetails.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bank"
                    label="Bank"
                    name="bank"
                    autoComplete="bank"
                    value={billerDetails.bank}
                    onChange={(e) => handleChange('bank', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    autoComplete="branch"
                    value={billerDetails.branch}
                    onChange={(e) => handleChange('branch', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountNo"
                    label="Account Number"
                    name="accountNo"
                    autoComplete="accountNo"
                    value={billerDetails.accountNo}
                    onChange={(e) => handleChange('accountNo', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Update Biller
            </Button>
        </Grid>
    );

}

function ViewBiller({ handleUpdate }) {

    //------------------------Table functions----------------------------
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

    //-------------------Table functions end-------------------------------

    const navigate = useNavigate();
    const theme = useTheme();

    const [billers, setBillers] = useState([]);

    const loadBillers = async () => {
        axios
            .get(GET_ALL_BILLERS, {})
            .then((response) => {
                setBillers(response.data)
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadBillers();
    }, [navigate]);

    const handleDelete = (billerId) => {
        axios
            .delete(DELETE_BILLER + billerId)
            .then((response) => {
                successAlert("Biller Deleted");
                loadBillers();
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleUpdateClick = (biller) => {
        handleUpdate(biller);
    };

    return (
        <Grid container sx={theme.palette.gridBody}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    View Billers
                </Typography>
            </Grid>

            <Grid item xs={12}>

                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Biller Id</StyledTableCell>
                                <StyledTableCell>Biller Type</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Bank</StyledTableCell>
                                <StyledTableCell>Branch</StyledTableCell>
                                <StyledTableCell>Account No</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {billers.map((biller) => (
                                <StyledTableRow>
                                    <StyledTableCell align="left">{biller.billerId}</StyledTableCell>
                                    <StyledTableCell align="left">{biller.type}</StyledTableCell>
                                    <StyledTableCell align="left">{biller.name}</StyledTableCell>
                                    <StyledTableCell align="left">{biller.bank}</StyledTableCell>
                                    <StyledTableCell align="left">{biller.branch}</StyledTableCell>
                                    <StyledTableCell align="left">{biller.accountNo}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => handleDelete(biller.billerId)}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton onClick={() => handleUpdateClick(biller)}>
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
                        count={billers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

            </Grid>
        </Grid>
    );

}