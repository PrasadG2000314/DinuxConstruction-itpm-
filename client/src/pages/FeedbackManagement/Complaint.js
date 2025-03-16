import { Box, Button, Grid, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_COMPLAINT, DELETE_COMPLAINT, GET_COMPLAINT, UPDATE_COMPLAINT } from "../../EndPoints";
import { errorAlert, userTypes } from "../../utils";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [totalComplaintCount, setTotalComplaintCount] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedUser.userType == userTypes.ADMIN || loggedUser.userType == userTypes.CUSTOMER_RELATIONSHIP_MANAGER) {
      setIsAuthorizedUser(true);
      getComplaints();
    }
  }, [navigate]);

  const getComplaints = () => {
    Axios.get(GET_COMPLAINT)
      .then(response => {
        setComplaints(response.data?.response || []);
        setTotalComplaintCount(response.data?.response.length || 0);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const addComplaint = (data) => {
    setSubmitted(true);
    console.log(data);
    const payload = {
      cname: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      subject: data.subject,
      complaint: data.complaint,
    }
    Axios.post(CREATE_COMPLAINT, payload)
      .then(() => {
        getComplaints();
        setSubmitted(false);
        setIsEdit(false);

      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateComplaint = (data) => {
    setSubmitted(true);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      subject: data.subject,
      complaint: data.complaint,
    }
    Axios.put(UPDATE_COMPLAINT, payload)
      .then(() => {
        getComplaints();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const deleteComplaint = (data) => {
    console.log(data);
    Axios.delete(DELETE_COMPLAINT + data._id)
      .then(() => {
        getComplaints();
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  return (
    <Box>
      <Grid container sx={theme.palette.gridBody}>
        <Grid item md={12}>
          <ComplaintForm
            addComplaint={addComplaint}
            updateComplaint={updateComplaint}
            submitted={submitted}
            data={selectedComplaint}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>

      {isAuthorizedUser &&
        <Grid container sx={theme.palette.gridBody}>
          <Grid item md={12}>
            <Typography variant="h6" component="h2">
              Total Complaint: {totalComplaintCount}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <ComplaintsTable
              rows={complaints}
              selectedComplaint={data => {
                setSelectedComplaint(data);
                setIsEdit(true);
              }}
              deleteComplaint={data => {
                window.confirm("Are you sure?") && deleteComplaint(data);
              }}
            />
          </Grid>
        </Grid>
      }
    </Box>
  );
}

export default Complaints;

const ComplaintForm = ({ addComplaint, updateComplaint, submitted, data, isEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [complaint, setComplaint] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (!submitted) {
      clearFields();
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.name && data.name !== 0) {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setType(data.type);
      setSubject(data.subject);
      setComplaint(data.complaint);
    }
  }, [data]);

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setType('');
    setSubject('');
    setComplaint('');
    setEmailError('');
    setPhoneError('');
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  }

  const handleEmailChange = (value) => {
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  }

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (value && !validatePhone(value)) {
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Complaint Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            placeholder="Enter Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            error={!!phoneError}
            helperText={phoneError}
            placeholder="Enter Phone"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            fullWidth
            displayEmpty
          >
            {Object.values(userTypes)
              .map((type) => (
                <MenuItem key={type} value={type}>
                  {type.toUpperCase()}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="subject"
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Enter Subject"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            fullWidth
            id="complaint"
            placeholder="Enter Complaint"
            minRows={4}
            value={complaint}
            onChange={e => setComplaint(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (isEdit) {
                updateComplaint({ name, email, phone, type, subject, complaint });
              } else {
                addComplaint({ name, email, phone, type, subject, complaint });
              }
            }}
            disabled={!!emailError || !!phoneError}
          >
            {isEdit ? 'Update' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

const ComplaintsTable = ({ rows, selectedComplaint, deleteComplaint }) => {

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
    <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Complaint</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map(row => (
              <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component='th' scope="row">{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.type}</StyledTableCell>
                <StyledTableCell>{row.subject}</StyledTableCell>
                <StyledTableCell>{row.complaint}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => selectedComplaint(row)}
                    sx={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteComplaint(row)}>
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
  );
}
