import { Button, Grid, MenuItem, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { SEARCH_VEHCILE_BY_TYPE } from "../../EndPoints";
import { errorAlert } from "../../utils";
import moment from "moment";

const FleetForm = ({ addFleetDetail, updateFleetDetail, submitted, data, isEdit, transport }) => {

  const theme = useTheme();

  const [VehicleType, setVehicleType] = useState('');
  const [VehicleNo, setVehicleNo] = useState([]);
  const [selectedVehicleNo, setSelectedVehicleNo] = useState('');
  const [DriverId, setDriverId] = useState(0);
  const [Purpose, setPurpose] = useState('');
  const [DriverMobileNo, setDriverMobileNo] = useState('');
  const [TransportLocation, setTransportLocation] = useState('');
  const [TransportRoot, setTransportRoot] = useState('');
  const [Start, setStart] = useState('');
  const [EstimatedEnd, setEnd] = useState('');

  useEffect(() => {
    if (!submitted) {
      setVehicleType('');
      setVehicleNo('');
      setDriverId(0);
      setPurpose('');
      setDriverMobileNo('');
      setTransportLocation('');
      setTransportRoot('');
      setStart('');
      setEnd('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.VehicleNo && data.VehicleNo !== '') {
      setVehicleType(data.VehicleType);
      setSelectedVehicleNo(data.VehicleNo);
      setDriverId(data.DriverId);
      setPurpose(data.Purpose);
      setDriverMobileNo(data.DriverMobileNo);
      setTransportLocation(data.TransportLocation);
      setTransportRoot(data.TransportRoot);
      setStart(moment(data.Start).format('YYYY-MM-DDTHH:mm'));
      setEnd(moment(data.EstimatedEnd).format('YYYY-MM-DDTHH:mm'));
    }
  }, [data]);

  useEffect(() => {
    if (transport.siteId) {
      setPurpose("Transporting Equipments");
      setTransportLocation("From Storage");
      setTransportRoot("To Site " + transport.siteId);
    }
  }, [transport]);

  useEffect(() => {
    const getAddVehicles = () => {
      if (VehicleType) {
        Axios.get(SEARCH_VEHCILE_BY_TYPE + VehicleType)
          .then(response => {
            console.log(response);
            const vNo = response.data.map((vehicle) => vehicle.VehicleNo);
            setVehicleNo(vNo);
          })
          .catch(error => {
            console.error("Axios Error :", error);
            errorAlert(error.response.data.message);
          });
      }
    }
    getAddVehicles();
  }, [VehicleType]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h4">Transportation Details</Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          id="VehicleType"
          required
          fullWidth
          name="VehicleType"
          label="VehicleType"
          value={VehicleType}
          onChange={e => setVehicleType(e.target.value)}
        >
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Truck">Truck</MenuItem>
          <MenuItem value="Van">Van</MenuItem>
          <MenuItem value="PickupTruck">Pickup Truck</MenuItem>
          <MenuItem value="ConcreteTruck">Concrete Truck</MenuItem>
          <MenuItem value="DumpTruck">Dump Truck</MenuItem>
          <MenuItem value="TankerTruck">Tanker Truck</MenuItem>
          <MenuItem value="SmallLorry">Small Lorry</MenuItem>
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id="VehicleNo"
          label="Vehicle No"
          name="VehicleNo"
          value={selectedVehicleNo}
          onChange={e => setSelectedVehicleNo(e.target.value)}
        >
          {Object.values(VehicleNo).map((vNo) => (
            <MenuItem value={vNo}>{vNo}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="DriverId"
          label="Driver Id"
          name="DriverId"
          value={DriverId}
          onChange={e => setDriverId(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          id="DriverMobileNo"
          required
          fullWidth
          label="Driver Mobile No"
          type="Number"
          name="DriverMobileNo"
          value={DriverMobileNo}
          onChange={e => setDriverMobileNo(e.target.value)}
        />
      </Grid>

      <Grid item md={12}>
        <TextField
          id="Purpose"
          required
          fullWidth
          name="Purpose"
          label="Purpose"
          value={Purpose}
          onChange={e => setPurpose(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          id="TransportLocation"
          required
          fullWidth
          name="TransportLocation"
          label="Transport Location"
          value={TransportLocation}
          onChange={e => setTransportLocation(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          id="TransportRoot"
          required
          fullWidth
          label="Transport Root"
          name="TransportRoot"
          value={TransportRoot}
          onChange={e => setTransportRoot(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          type="datetime-local"
          id="Start"
          required
          fullWidth
          name="Start"
          label="Start"
          InputLabelProps={{
            shrink: true,
          }}
          value={Start}
          onChange={e => setStart(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          type="datetime-local"
          id="End"
          required
          fullWidth
          name="End"
          label="Estimated End"
          InputLabelProps={{
            shrink: true,
          }}
          value={EstimatedEnd}
          onChange={e => setEnd(e.target.value)}
        />
      </Grid>

      <Button
        variant="contained" sx={{ mt: 3, width: "50%" }}
        onClick={() => isEdit ? updateFleetDetail({ VehicleType, selectedVehicleNo, DriverId, Purpose, DriverMobileNo, TransportLocation, TransportRoot, Start, EstimatedEnd }) : addFleetDetail({ VehicleType, selectedVehicleNo, DriverId, Purpose, DriverMobileNo, TransportLocation, TransportRoot, Start, EstimatedEnd })}
      >
        {isEdit ? "Update" : "Add"}
      </Button>
    </Grid>
  );
}

export default FleetForm;

