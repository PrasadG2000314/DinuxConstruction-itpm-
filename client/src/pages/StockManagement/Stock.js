import { Box, Button, Grid, MenuItem, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, scrollPage, successAlert } from "../../utils";
import { CREATE_STOCK, DELETE_STOCK, GET_ALL_STOCK, GET_STOCK_ID, UPDATE_STOCK } from "../../EndPoints";


const StockPage = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  const [isEdit, setIsEdit] = useState(false);

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

  const addStock = (data) => {
    setSubmitted(true);
    const payload = {
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      price: data.price,
      unit: data.unit,
      description: data.description,
      qty: data.qty,
      minimumQty: data.minimumQty,
    }

    Axios.post(CREATE_STOCK, payload)
      .then((response) => {
        getStockDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        // errorAlert("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateStock = (data) => {
    setSubmitted(true);
    const payload = {
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      price: data.price,
      unit: data.unit,
      description: data.description,
      qty: data.qty,
      minimumQty: data.minimumQty
    }
    Axios.put(UPDATE_STOCK, payload)
      .then((response) => {
        getStockDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        // errorAlert("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const deleteStock = (data) => {
    Axios.delete(DELETE_STOCK + data.equipmentId)
      .then((response) => {
        getStockDetails();
        successAlert("Data Deleted Succesfully");
      })
      .catch(error => {
        // errorAlert("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const handleUpdate = (content) => {
    setSelectedStock(content.row);
    setIsEdit(true);
  }

  return (
    <Box>
      <StockForm
        addStock={addStock}
        updateStock={updateStock}
        submitted={submitted}
        data={selectedStock}
        isEdit={isEdit}
      />
      <StockTable
        rows={stockDetails}
        selectedRow={handleUpdate}
        deleteStock={data => {
          deleteStock(data);
        }}
      />
    </Box>
  );
}

export default StockPage;


const StockForm = ({ addStock, updateStock, submitted, data, isEdit }) => {

  const theme = useTheme();
  const [equipmentId, setEquipmentId] = useState(0);
  const [equipmentName, setEquipmentName] = useState(0);
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [minimumQty, setMinimumQty] = useState('');

  const loadStockId = async () => {
    Axios
      .get(GET_STOCK_ID, {})
      .then((response) => {
        setEquipmentId(response.data)
      })
      .catch((error) => {
        errorAlert(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!submitted) {
      loadStockId();
      setEquipmentName('');
      setPrice('');
      setUnit('');
      setDescription('');
      setQty(0);
      setMinimumQty(0);
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.equipmentId) {
      setEquipmentId(data.equipmentId);
      setEquipmentName(data.name);
      setPrice(data.price);
      setUnit(data.unit);
      setDescription(data.description);
      setQty(data.qty);
      setMinimumQty(data.minimumQty);
    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h5" gutterBottom>{isEdit ? 'Update Stock' : 'Add Stock'}</Typography>
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
          onChange={e => setEquipmentId(e.target.value)}
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
          autoFocus
          onChange={e => setEquipmentName(e.target.value)}
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
          onChange={e => setPrice(e.target.value)}
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
          onChange={e => setUnit(e.target.value)}
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
          onChange={e => setDescription(e.target.value)}
        />
      </Grid>


      <Grid item md={6}>
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
      <Grid item md={6}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id='minqty'
          label="Minimum Qty"
          name="minqty"
          value={minimumQty}
          onChange={e => setMinimumQty(e.target.value)}
        />
      </Grid>
      <Button
        variant="contained" sx={{ mt: 3, width: "50%" }}
        onClick={() => isEdit ? updateStock({ equipmentId, equipmentName, price, unit, description, qty, minimumQty }) : addStock({ equipmentId, equipmentName, price, unit, description, qty, minimumQty })}
      >
        {isEdit ? 'Update' : 'Add'}
      </Button>

    </Grid>
  );
}

const StockTable = ({ rows, selectedRow, deleteStock }) => {

  const theme = useTheme();
  //--------------------------Table Functions------------------------------
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
  //--------------------------Table Functions end------------------------------
  const [eqStatus, setEqStatus] = useState("all");
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleUpdate = (content) => {
    scrollPage(0);
    selectedRow(content);
  };

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h5" gutterBottom>Search By</Typography>
      </Grid>
      <Grid item md={6}>
        <TextField
          select
          required
          fullWidth
          id='eqStat'
          label="Equipment Status"
          name="eqStat"
          value={eqStatus}
          onChange={(e) => setEqStatus(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="OK">OK</MenuItem>
          <MenuItem value="Insufficient">Insufficient</MenuItem>
        </TextField>
      </Grid>
      <Grid item md={6}>
        <TextField
          required
          fullWidth
          id='eqStat'
          label="Equipment Name"
          name="eqStat"
          value={filterValue}
          onChange={handleFilterChange}
        />
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
                <StyledTableCell>Qty</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? rows
                .filter(row => row.name.toLowerCase().includes(filterValue.toLowerCase())) // Filter rows based on the equipment name
                .filter(row => eqStatus === 'all' || (eqStatus === 'OK' && (row.qty - row.minimumQty) > 0) || (eqStatus === 'Insufficient' && (row.qty - row.minimumQty) <= 0)) // Apply eqStatus filter
                .map(row => (
                  <StyledTableRow key={row.equipmentId}>
                    <StyledTableCell>{row.equipmentId}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell>{row.qty}{row.unit}</StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body1" style={{ color: ((row.qty - row.minimumQty) > 0) ? 'green' : 'red' }}>
                        {((row.qty - row.minimumQty) > 0) ? "OK" : "Insufficient Stock"}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button sx={{ margin: '0px 10px' }} onClick={() => handleUpdate({ row })}>
                        Update
                      </Button>
                      <Button sx={{ margin: '0px 10px' }} onClick={() => deleteStock({ equipmentId: row.equipmentId })}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )
                ) : (
                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>No Data</StyledTableCell>
                </StyledTableRow>
              )}

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