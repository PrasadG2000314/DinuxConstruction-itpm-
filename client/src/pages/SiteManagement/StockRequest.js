import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TextField, Typography, Button, Grid, styled, TableCell, tableCellClasses, TableRow, TableContainer, Table, TableHead, TableBody, TablePagination, useTheme, Paper } from "@mui/material";
import { errorAlert, successAlert } from "../../utils.js";
import { GET_ALL_STOCK, REQUEST_STOCK } from "../../EndPoints.js";


function StockRequest() {

    const [stockDetails, setStockDetails] = useState([]);
    const [requestedStock, setRequestedStock] = useState([]);

    useEffect(() => {
        getStockDetails();
    }, []);

    const getStockDetails = () => {
        Axios.get(GET_ALL_STOCK)
            .then(response => {
                setStockDetails(response.data ? response.data : []);
            })
            .catch(error => {
                console.log(error);
                // errorAlert("Axios Error :", error);
                errorAlert(error.response.data.message);
            });
    }

    const requestStock = (data) => {
        setRequestedStock(data);
    }

    return (
        <Grid container>
            <Grid item md={12}>
                <ExisitngStock
                    rows={stockDetails}
                    requestStock={requestStock} />
            </Grid>
            <Grid item md={12}>
                <RequestedStock data={requestedStock} submitted={getStockDetails} />
            </Grid>
        </Grid>
    );

}

export default StockRequest;

function ExisitngStock({ rows, requestStock }) {
    const theme = useTheme();

    //----------------------Table Functions-----------------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    useEffect(() => {
    }, [rows]);

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
    //----------------------Table Functions End-----------------------------------

    const [equipmentId, setEquipmentId] = useState(0);
    const [equipmentName, setEquipmentName] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [existingQty, setExistingQty] = useState(0);

    const handleRequest = (content) => {
        setEquipmentId(content.equipmentId);
        setEquipmentName(content.name);
        setPrice(content.price);
        setExistingQty(content.qty);
    };

    const handleClick = () => {
        if (qty > existingQty) {
            errorAlert("Insufficent Stock");
        } else {
            requestStock({ equipmentId, equipmentName, price, existingQty, qty });
            setEquipmentId('');
            setEquipmentName('');
            setPrice(0);
            setQty(0);
            setExistingQty(0);
        }
    }

    return (
        <Grid container spacing={2} sx={theme.palette.gridBody}>

            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Request Stock
                </Typography>
            </Grid>
            <Grid item md={4}>
                <TextField
                    required
                    fullWidth
                    id='equipmentName'
                    label="Equipment Name"
                    name="equipmentName"
                    autoComplete="equipmentName"
                    value={equipmentName}
                    disabled
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id='qty'
                    label="Qty"
                    name="qty"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <Button
                    variant="contained" sx={{ mt: 3, width: "50%" }}
                    onClick={() => handleClick()}
                >
                    Request
                </Button>
            </Grid>
            <Grid item md={12}>
                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Equipment Id</StyledTableCell>
                                <StyledTableCell>Equipment Name</StyledTableCell>
                                <StyledTableCell>Unit Price</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Available Qty</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? rows.map(row => (
                                <StyledTableRow key={row.equipmentId}>
                                    <StyledTableCell>{row.equipmentId}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.price}</StyledTableCell>
                                    <StyledTableCell>{row.description}</StyledTableCell>
                                    <StyledTableCell>{row.qty}</StyledTableCell>

                                    <StyledTableCell>
                                        <Button sx={{ margin: '0px 10px' }}
                                            onClick={() => handleRequest(row)}
                                        >
                                            Request
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
                        count={rows.length}
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

function RequestedStock({ data, submitted }) {

    const theme = useTheme();

    //------------------------Table Functions Start------------------------------------
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
    //------------------------Table Functions End------------------------------------

    const [rows, setRows] = useState([]);
    const [siteId, setsiteId] = useState([]);
    const [totPrice, setTotPrice] = useState(0);

    useEffect(() => {
        if (data?.equipmentId) {
            if (!rows.some(row => row.equipmentId === data.equipmentId)) {
                const rowData = {
                    equipmentId: data.equipmentId,
                    equipmentName: data.equipmentName,
                    price: data.price,
                    existingQty: data.existingQty,
                    qty: data.qty
                };
                const updatedRows = [...rows, rowData];
                setRows(updatedRows);
            }
            setTotPrice(totPrice + (data.price * data.qty));
        }
    }, [data]);

    const removeRow = (content) => {
        let equipmentIdToRemove = content.equipmentId;
        const updatedRows = rows.filter(row => row.equipmentId !== equipmentIdToRemove);
        setRows(updatedRows);
        setTotPrice(totPrice - (content.price * content.qty));
    };

    const handleSubmit = () => {
        
        Axios.post(REQUEST_STOCK, {
            equipments: rows,
            siteId: siteId
        })
            .then((response) => {
                setRows([]);
                setsiteId("");
                submitted();
                successAlert("Details Updated Succesfully");
            })
            .catch(error => {
                console.log(error);
                // errorAlert("Axios Error :", error);
                errorAlert(error.response.data.message);
            });
    }

    return (
        <Grid container spacing={2} sx={theme.palette.gridBody}>
            <Grid item md={12}>
                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Equipment Id</StyledTableCell>
                                <StyledTableCell>Equipment Name</StyledTableCell>
                                <StyledTableCell>Qty</StyledTableCell>
                                <StyledTableCell>Total Price</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.length > 0 ? rows.map(row => (
                                    <StyledTableRow key={row.equipmentId}>
                                        <StyledTableCell>{row.equipmentId}</StyledTableCell>
                                        <StyledTableCell>{row.equipmentName}</StyledTableCell>
                                        <StyledTableCell>{row.qty}</StyledTableCell>
                                        <StyledTableCell>{parseInt(row.price) * parseInt(row.qty)}</StyledTableCell>


                                        <StyledTableCell>
                                            <Button sx={{ margin: '0px 10px' }} onClick={() => removeRow(row)}>
                                                Remove
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
            <Grid item md={12}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="tot"
                            name="tot"
                            label="Total Price"
                            autoComplete="tot"
                            disabled
                            value={totPrice}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="siteId"
                            name="siteId"
                            label="Site Id"
                            autoComplete="siteId"
                            value={siteId}
                            onChange={(e) => setsiteId(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <Button variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }} onClick={handleSubmit}>
                            Request Stock
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}