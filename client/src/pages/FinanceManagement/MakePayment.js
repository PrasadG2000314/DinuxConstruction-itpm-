import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme, Radio, RadioGroup, FormControlLabel, TableRow, TableHead, Table, TableContainer, TableBody, tableCellClasses, TableCell, Paper, styled, TablePagination } from "@mui/material";
import axios from "axios";
import { GET_ALL_BANKS, GET_BANK_BY_ID, GET_BILLER_BY_TYPE, GET_PAYMENTS, MAKE_COMPANY_PAYMENT } from "../../EndPoints";
import { errorAlert, utilities, successAlert, months, billerTypes } from "../../utils.js";

function MakePayment() {

    const theme = useTheme();

    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Grid container>
            <Grid item md={12}>
                <Grid
                    container
                    spacing={2}
                    sx={theme.palette.gridBody}
                    noValidate
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Transactions
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <RadioGroup value={selectedValue} onChange={handleChange} row>
                            <FormControlLabel value="utility" control={<Radio />} label="Make Utility Bill Payment" />
                            <FormControlLabel value="biller" control={<Radio />} label="Make Biller Payment" />
                            <FormControlLabel value="other" control={<Radio />} label="Make Other Payments" />
                            <FormControlLabel value="view" control={<Radio />} label="View Transactions" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12}>
                {selectedValue == "utility" && <UtilityBillPayment />}
                {selectedValue == "biller" && <BillerPayment />}
                {selectedValue == "other" && <OtherPayment />}
                {selectedValue == "view" && <ViewPayments />}
            </Grid>
        </Grid>
    );

}

export default MakePayment;

function UtilityBillPayment() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [paymentDetails, setPaymentDetails] = useState({
        paymentType: "Utility",
        payTo: "",
        payFrom: "",
        regarding: "",
        amount: "0",
        description: "",
    });
    const [banks, setBanks] = useState([]);

    const handleChange = (field, value) => {
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadBank = async () => {
            axios
                .get(GET_ALL_BANKS, {})
                .then((response) => {
                    const bankNames = response.data.map((bank) => bank.bankName);
                    setBanks(bankNames);
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        };

        loadBank();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(MAKE_COMPANY_PAYMENT, paymentDetails)
            .then((response) => {
                setPaymentDetails({
                    paymentType: "Utility",
                    payTo: "",
                    payFrom: "",
                    regarding: "",
                    amount: "",
                    description: "",
                });
                successAlert(response.data.message);
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
                    Utility Bill Payment
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="payTo"
                    label="Pay To"
                    name="payTo"
                    autoComplete="payTo"
                    autoFocus
                    value={paymentDetails.payTo}
                    onChange={(e) => handleChange('payTo', e.target.value)}
                >
                    {Object.values(utilities).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
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
                    id="payFrom"
                    label="Pay From"
                    name="payFrom"
                    autoComplete="payFrom"
                    value={paymentDetails.payFrom}
                    onChange={(e) => handleChange('payFrom', e.target.value)}
                >
                    {Object.values(banks).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
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
                    value={paymentDetails.regarding}
                    onChange={(e) => handleChange('regarding', e.target.value)}
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
                    onChange={(e) => handleChange('amount', e.target.value)}
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
                Make Payment
            </Button>
        </Grid>
    );

}

function BillerPayment() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [paymentDetails, setPaymentDetails] = useState({
        paymentType: "Biller",
        type: "",
        payTo: "",
        payFrom: "",
        regarding: "",
        amount: "0",
        description: "",
    });
    const [banks, setBanks] = useState([]);
    const [billers, setBillers] = useState([]);

    const handleChange = (field, value) => {
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadBank = async () => {
            axios
                .get(GET_ALL_BANKS, {})
                .then((response) => {
                    const bankNames = response.data.map((bank) => bank.bankName);
                    setBanks(bankNames);
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        };
        loadBank();
    }, [navigate]);

    const loadBillers = async (type) => {
        handleChange('type', type);
        axios
            .get(GET_BILLER_BY_TYPE + type, {})
            .then((response) => {
                const billerDetails = response.data.map((biller) => {
                    return {
                        id: biller.billerId,
                        name: biller.name
                    };
                });
                setBillers(billerDetails);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(MAKE_COMPANY_PAYMENT, paymentDetails)
            .then((response) => {
                setPaymentDetails({
                    paymentType: "Biller",
                    type: "",
                    payTo: "",
                    payFrom: "",
                    regarding: "",
                    amount: "",
                    description: "",
                });
                successAlert(response.data.message);
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
                    Biller Payment
                </Typography>
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
                    value={paymentDetails.type}
                    onChange={(e) => loadBillers(e.target.value)}
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
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="biller"
                    label="Biller"
                    name="biller"
                    autoComplete="biller"
                    value={paymentDetails.payTo}
                    onChange={(e) => handleChange('payTo', e.target.value)}
                >
                    {Object.values(billers).map((biller) => (
                        <MenuItem key={biller.id} value={biller.id}>
                            {biller.name}
                        </MenuItem>
                    ))}

                    {/*billers.map((biller) => (
                        <MenuItem key={biller.id} value={biller.id}>
                            {biller.name}
                        </MenuItem>
                    ))*/}

                </TextField>
            </Grid>

            <Grid item md={4}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="payFrom"
                    label="Pay From"
                    name="payFrom"
                    autoComplete="payFrom"
                    value={paymentDetails.payFrom}
                    onChange={(e) => handleChange('payFrom', e.target.value)}
                >
                    {Object.values(banks).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item md={5}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="regarding"
                    label="Reason"
                    name="regarding"
                    autoComplete="regarding"
                    value={paymentDetails.regarding}
                    onChange={(e) => handleChange('regarding', e.target.value)}
                />
            </Grid>

            <Grid item md={3}>
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
                    onChange={(e) => handleChange('amount', e.target.value)}
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
                Make Payment
            </Button>
        </Grid>
    );

}

function OtherPayment() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [paymentDetails, setPaymentDetails] = useState({
        paymentType: "Other",
        payTo: "",
        payFrom: "",
        regarding: "",
        amount: "0",
        description: "",
        bank: "",
        branch: "",
        accountNo: "",
    });
    const [banks, setBanks] = useState([]);

    const handleChange = (field, value) => {
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadBank = async () => {
            axios
                .get(GET_ALL_BANKS, {})
                .then((response) => {
                    const bankNames = response.data.map((bank) => bank.bankName);
                    setBanks(bankNames);
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        };

        loadBank();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(MAKE_COMPANY_PAYMENT, paymentDetails)
            .then((response) => {
                setPaymentDetails({
                    paymentType: "Other",
                    payTo: "",
                    payFrom: "",
                    regarding: "",
                    amount: "",
                    description: "",
                    bank: "",
                    branch: "",
                    accountNo: "",
                });
                successAlert(response.data.message);
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
                    Other Bill Payment
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="payTo"
                    label="Name"
                    name="payTo"
                    autoComplete="payTo"
                    autoFocus
                    value={paymentDetails.payTo}
                    onChange={(e) => handleChange('payTo', e.target.value)}
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
                    value={paymentDetails.bank}
                    onChange={(e) => handleChange('bank', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    autoComplete="branch"
                    value={paymentDetails.branch}
                    onChange={(e) => handleChange('branch', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountNo"
                    label="Account Number"
                    name="accountNo"
                    autoComplete="accountNo"
                    value={paymentDetails.accountNo}
                    onChange={(e) => handleChange('accountNo', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
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
                    onChange={(e) => handleChange('amount', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="regarding"
                    label="Reason"
                    name="regarding"
                    autoComplete="regarding"
                    value={paymentDetails.regarding}
                    onChange={(e) => handleChange('regarding', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="payFrom"
                    label="Pay From"
                    name="payFrom"
                    autoComplete="payFrom"
                    value={paymentDetails.payFrom}
                    onChange={(e) => handleChange('payFrom', e.target.value)}
                >
                    {Object.values(banks).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
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
                Make Payment
            </Button>
        </Grid>
    );

}

function ViewPayments() {

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
    const [selectedValue, setSelectedValue] = useState("all");
    const [payments, setPayments] = useState([]);
    
    const loadPayments = async (selectedValue) => {
        axios
            .get(GET_PAYMENTS + selectedValue, {})
            .then((response) => {
                setPayments(response.data);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadPayments("all");
    }, [navigate]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        loadPayments(event.target.value);
    };

    return (
        <Grid container sx={theme.palette.gridBody}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    View Billers
                </Typography>
            </Grid>
            <Grid item xs={12}>
                View By
                <RadioGroup value={selectedValue} onChange={handleChange} row>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="Utility" control={<Radio />} label="Utility" />
                    <FormControlLabel value="Biller" control={<Radio />} label="Biller" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
            </Grid>

            <Grid item xs={12}>

                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Payment Type</StyledTableCell>
                                <StyledTableCell>Pay From</StyledTableCell>
                                <StyledTableCell>Pay To</StyledTableCell>
                                <StyledTableCell>Regarding</StyledTableCell>
                                <StyledTableCell>Amount</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Other Details</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(payments).map((payments) => (
                                <StyledTableRow>
                                    <StyledTableCell align="left">{new Date(payments.date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.paymentType}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.payFrom}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.payTo}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.regarding}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.amount}</StyledTableCell>
                                    <StyledTableCell align="left">{payments.description}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {payments.bank}{" "}
                                        {payments.branch}{" "}
                                        {payments.accountNo}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        sx={{ backgroundColor: theme.palette.primary.main, }}
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        count={payments.length}
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