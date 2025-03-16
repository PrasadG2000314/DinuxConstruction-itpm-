import { Box, TextField, Button, Grid, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert } from "../../utils";
import FleetTable from './SimpleFleetTable.js';
import { SEARCH_FLEET, SEARCH_FLEET_BY_DRIVER_ID } from "../../EndPoints";

const FleetTablePage = () => {
  const [fleetDetails, setFleetDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();

  useEffect(() => {
    getFleetDetails();
  }, []);

  const getFleetDetails = () => {
    Axios.get(SEARCH_FLEET)
      .then(response => {
        setFleetDetails(response.data ? response.data : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const handleSearch = () => {
    Axios.get(SEARCH_FLEET_BY_DRIVER_ID + searchTerm)
      .then(response => {
        setFleetDetails(response.data ? [response.data] : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        // errorAlert("Failed to search for fleet details.");
        errorAlert(error.response.data.message);
      });
  }

  return (
    <Box>
      <Grid container spacing={2} sx={theme.palette.gridBody}>
        <Grid item md={6}>
          <TextField
            type="text"
            placeholder="Search..."
            fullWidth
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: '10px' }}>Search</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={theme.palette.gridBody}>
        <FleetTable
          rows={fleetDetails}
        />
      </Grid>
    </Box>
  );
}

export default FleetTablePage;
