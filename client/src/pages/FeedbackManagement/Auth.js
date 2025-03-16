import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Select, MenuItem, useTheme, styled, tableCellClasses, TablePagination } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { CREATE_AUTH, DELETE_AUTH, GET_AUTH, UPDATE_AUTH } from "../../EndPoints";
import { errorAlert, userTypes } from "../../utils";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auths = () => {
  const [auths, setAuths] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAuth, setSelectedAuth] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedUser.userType == userTypes.ADMIN || loggedUser.userType == userTypes.CUSTOMER_RELATIONSHIP_MANAGER) {
      setIsAuthorizedUser(true);
      getAuths();
    }
  }, [navigate]);

  const getAuths = () => {
    Axios.get(GET_AUTH)
      .then(response => {
        setAuths(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addAuth = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      localauthorityname: data.localauthorityname,
      type: data.type,
      city: data.city,
      place: data.place,
      nooffloors: data.nooffloors,
      distancecity: data.distancecity,
    }
    Axios.post(CREATE_AUTH, payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        errorAlert(error.response.data.message);
      });
  }

  const updateAuth = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      localauthorityname: data.localauthorityname,
      type: data.type,
      city: data.city,
      place: data.place,
      nooffloors: data.nooffloors,
      distancecity: data.distancecity,
    }
    Axios.put(UPDATE_AUTH, payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const deleteAuth = (data) => {
    Axios.delete(DELETE_AUTH + data)
      .then(() => {
        getAuths();
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const generatePDFReport = (authData) => {
    const doc = new jsPDF();
    const tableHead = [
      ['ID', 'Local Authority Name', 'Type', 'City', 'Place', 'No of Floors', 'distance from city', 'Construction Status'],
    ];
    const tableBody = authData.map(auth => {
      let constructionStatus;
      if ((auth.type === 'House' && parseInt(auth.nooffloors) > 3 && parseInt(auth.distancecity) < 3) ||
        (auth.type === 'Building' && parseInt(auth.nooffloors) > 5 && parseInt(auth.distancecity) < 2)) {
        constructionStatus = 'Fail Construction';
      } else {
        constructionStatus = 'Pass Construction, you can continue';
      }
      return [
        auth.id,
        auth.localauthorityname,
        auth.type,
        auth.city,
        auth.place,
        auth.nooffloors,
        auth.distancecity,
        constructionStatus
      ];
    });

    doc.autoTable({
      head: tableHead,
      body: tableBody,
      startY: 20,
      columnWidths: [30, 60, 30, 30, 40, 30, 30, 50],
    });
    doc.save("auth_report.pdf");
  };

  return (
    <Grid container>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <AuthForm
          addAuth={addAuth}
          updateAuth={updateAuth}
          submitted={submitted}
          data={selectedAuth}
          isEdit={isEdit}
        />
      </Grid>
      {isAuthorizedUser &&
        <Grid item md={12} sx={theme.palette.gridBody}>
          <AuthsTable
            rows={auths}
            selectedAuth={data => {
              setSelectedAuth(data);
              setIsEdit(true);
            }}
            deleteAuth={data => {
              window.confirm("Are you sure?") && deleteAuth(data);
            }}
            generatePDFReport={generatePDFReport}
          />
        </Grid>
      }
    </Grid>
  );
}

const AuthForm = ({ addAuth, updateAuth, submitted, data, isEdit }) => {

  const [id, setId] = useState(0);
  const [localauthorityname, setLocalauthorityname] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [place, setPlace] = useState('');
  const [nooffloors, setNooffloors] = useState('');
  const [distancecity, setDistancecity] = useState('');

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setLocalauthorityname('');
      setType('');
      setCity('');
      setPlace('');
      setNooffloors('');
      setDistancecity('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setLocalauthorityname(data.localauthorityname);
      setType(data.type);
      setCity(data.city);
      setPlace(data.place);
      setNooffloors(data.nooffloors);
      setDistancecity(data.distancecity);
    }
  }, [data]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Authorization Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            fullWidth
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="localauthorityname"
            label="Local Authority Name"
            variant="outlined"
            fullWidth
            value={localauthorityname}
            onChange={e => setLocalauthorityname(e.target.value)}
            placeholder="Enter Local Authority Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>Type</MenuItem>
            <MenuItem value="Building">Building</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="place"
            label="Place"
            variant="outlined"
            fullWidth
            value={place}
            onChange={e => setPlace(e.target.value)}
            placeholder="Enter Place"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nooffloors"
            label="No of Floors"
            variant="outlined"
            fullWidth
            value={nooffloors}
            onChange={e => setNooffloors(e.target.value)}
            placeholder="Enter No of Floors"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="distancecity"
            label="Distance from city"
            variant="outlined"
            fullWidth
            value={distancecity}
            onChange={e => setDistancecity(e.target.value)}
            placeholder="Enter Distance from city (km)"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (isEdit) {
                updateAuth({ id, localauthorityname, type, city, place, nooffloors, distancecity });
              } else {
                addAuth({ id, localauthorityname, type, city, place, nooffloors, distancecity });
              }
            }}
          >
            {isEdit ? 'Update' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

}

const AuthsTable = ({ rows, selectedAuth, deleteAuth, generatePDFReport }) => {

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


  return (
    <Box>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Local authority name</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Place</StyledTableCell>
              <StyledTableCell>No of floors</StyledTableCell>
              <StyledTableCell>Distance from city</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows.map(row => (
                <StyledTableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell component='th' scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell>{row.localauthorityname}</StyledTableCell>
                  <StyledTableCell>{row.type}</StyledTableCell>
                  <StyledTableCell>{row.city}</StyledTableCell>
                  <StyledTableCell>{row.place}</StyledTableCell>
                  <StyledTableCell>{row.nooffloors}</StyledTableCell>
                  <StyledTableCell>{row.distancecity}</StyledTableCell>
                  <StyledTableCell>
                    <Button sx={{ margin: '0px 10px' }} onClick={() => selectedAuth(row)}>
                      Update
                    </Button>
                    <Button sx={{ margin: '0px 10px' }} onClick={() => deleteAuth(row.id)}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3}>No Data</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Button
        variant="contained"
        onClick={() => generatePDFReport(rows)}
      >
        Generate Report
      </Button>
    </Box>
  );
}

export default Auths;
