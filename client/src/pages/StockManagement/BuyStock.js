import { Autocomplete, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import { BUY_STOCK, GET_ALL_STOCK, GET_BOUGHT_STOCK_DETAILS } from "../../EndPoints";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const BuyStock = () => {

    const [stockDetails, setStockDetails] = useState([]);

    const handleSearch = (value) => {
        setStockDetails(value);
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={6}>
                <BuyStockSearch filterValue={handleSearch} />
            </Grid>
            <Grid item md={6}>
                <StockReplenishmentReport />
            </Grid>
            <Grid item md={12}>
                <BuyStockForm data={stockDetails} />
            </Grid>
        </Grid>
    );
}

export default BuyStock;

const BuyStockSearch = ({ filterValue }) => {

    const theme = useTheme();
    const [stockDetails, setStockDetails] = useState([]);

    useEffect(() => {
        getStockDetails();
    }, []);

    const getStockDetails = () => {
        Axios.get(GET_ALL_STOCK)
            .then(response => {
                setStockDetails(response.data ? response.data : []);
            })
            .catch(error => {
                // errorAlert("Axios Error :", error);
                errorAlert(error.response.data.message);
            });
    }

    const handleFilterChange = (event, newValue) => {
        filterValue(newValue);
    };

    return (
        <Grid container spacing={2} sx={theme.palette.gridBody}>
            <Grid item md={12}>
                <Typography variant="h5" gutterBottom>Search Equipment to Buy</Typography>
            </Grid>
            <Grid item md={10}>
                <Autocomplete
                    disablePortal
                    id="eqSearch"
                    options={stockDetails}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Equipment Name" />}
                    onChange={handleFilterChange}
                />
            </Grid>
        </Grid>
    );
}

const BuyStockForm = (values) => {

    const theme = useTheme();
    const [equipmentId, setEquipmentId] = useState(0);
    const [equipmentName, setEquipmentName] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState('');
    const [minimumQty, setMinimumQty] = useState('');
    const [qtyBought, setQtyBought] = useState('');

    useEffect(() => {
        let data = values.data;
        if (data.equipmentId) {
            setEquipmentId(data.equipmentId);
            setEquipmentName(data.name);
            setPrice(data.price);
            setUnit(data.unit);
            setDescription(data.description);
            setQty(data.qty);
            setMinimumQty(data.minimumQty);
        }
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();

        Axios
            .post(BUY_STOCK, {
                equipmentId: equipmentId,
                price: price,
                qty: qty,
                qtyBought: qtyBought,
            })
            .then((response) => {
                successAlert("Stock Buying Success");
            })
            .catch((error) => {
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
            onSubmit={handleSubmit}>
            <Grid item md={12}>
                <Typography variant="h5" gutterBottom>Buy Stock</Typography>
            </Grid>

            <Grid item md={6}>
                <TextField
                    required
                    fullWidth
                    id='equipmentId'
                    label="Equpment Id"
                    name="equipmentId"
                    autoComplete="equipmentId"
                    value={equipmentId}
                    disabled
                />
            </Grid>

            <Grid item md={6}>
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

            <Grid item md={3}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id='price'
                    label="Unit Price"
                    name="price"
                    value={price}
                    disabled
                />
            </Grid>

            <Grid item md={3}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id='unit'
                    label="Measuring Unit"
                    name="unit"
                    value={unit}
                    disabled
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id='description'
                    label="Description"
                    name="description"
                    value={description}
                    disabled
                    onChange={e => setDescription(e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id='minqty'
                    label="Minimum Qty"
                    name="minqty"
                    value={minimumQty}
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
                    label="Existing Qty"
                    name="qty"
                    value={qty}
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
                    label="Qty Bought"
                    name="qty"
                    value={qtyBought}
                    onChange={e => setQtyBought(e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Mark Bought
            </Button>

        </Grid>
    );
}

const StockReplenishmentReport = () => {

    const theme = useTheme();

    const [selectedMonth, setSelectedMonth] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios
            .get(GET_BOUGHT_STOCK_DETAILS + selectedMonth)
            .then((response) => {
                console.log(response);
                generatePDFReport(response.data);
            })
            .catch((error) => {
                errorAlert(error.response.data.message);
            });
    };

    const generatePDFReport = (replenishDetails) => {
        const doc = new jsPDF();
        const tableHead = [
            ['Date', 'Equipment Id', 'qty', 'Total Price'],
        ];
        const tableBody = [];
        replenishDetails.forEach((stock) => {
            const stockData = [
                moment(stock.date).format('MMMM Do YYYY, h:mm:ss a'),
                stock.equipmentId,
                stock.qty,
                stock.totalPrice,
            ];
            tableBody.push(stockData);
        });

        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 20,
            columnWidths: [50, 50, 30, 30],
        });
        doc.save("stock_report.pdf");
    };

    return (
        <Grid
            container
            spacing={1}
            component="form"
            sx={theme.palette.gridBody}
            noValidate
            onSubmit={handleSubmit}
        >
            <Grid item md={12}>
                <Typography variant="h5" gutterBottom>
                    Monthly Stock Replenishment Report
                </Typography>
            </Grid>
            <Grid item md={7}>
                <TextField
                    margin="normal"
                    type="month"
                    required
                    fullWidth
                    id="month"
                    name="month"
                    label="Month"
                    autoComplete="month"
                    autoFocus
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
            </Grid>
            <Grid item md={5}>
                <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                    Generate
                </Button>
            </Grid>
        </Grid>
    );
}