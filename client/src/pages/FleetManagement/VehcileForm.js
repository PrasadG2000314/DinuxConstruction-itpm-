import { Button, Grid, MenuItem, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const VehicleForm = ({ addVehicle, updateVehicle, submitted, data, isEdit }) => {

  const theme = useTheme();
  const [ChassisNo, setChassisNo] = useState(0);
  const [VehicleType, setVehicleType] = useState('');
  const [VehicleManufachuredYear, setVehicleManufachuredYear] = useState('');
  const [VehicleBrand, setVehicleBrand] = useState('');
  const [VehicleNo, setVehicleNo] = useState('');


  useEffect(() => {
    if (!submitted) {
      setChassisNo(0)
      setVehicleType('');
      setVehicleManufachuredYear('');
      setVehicleBrand('');
      setVehicleNo('');

    }
  }, [submitted]);

  useEffect(() => {
    if (data?.ChassisNo && data.ChassisNo !== 0) {
      setChassisNo(data.ChassisNo);
      setVehicleType(data.VehicleType);
      setVehicleManufachuredYear(data.VehicleManufachuredYear);
      setVehicleBrand(data.VehicleBrand);
      setVehicleNo(data.VehicleNo);

    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h5" gutterBottom>Add Vehicles</Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          type="number"
          required
          fullWidth
          id='ChassisNo'
          label="Chassis No"
          name="ChassisNo"
          autoComplete="ChassisNo"
          value={ChassisNo}
          onChange={e => setChassisNo(e.target.value)}
          autoFocus
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='VehicleNo'
          label="Vehicle No"
          name="VehicleNo"
          value={VehicleNo}
          onChange={e => setVehicleNo(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          id='VehicleType'
          required
          fullWidth
          name="VehicleType"
          label='VehicleType'
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
          margin="normal"
          required
          fullWidth
          id='VehicleBrand'
          label="Vehicle Brand "
          name="VehicleBrand"
          value={VehicleBrand}
          onChange={e => setVehicleBrand(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='VehicleManufachuredYear'
          label="Vehicle Manufachured Year "
          name="VehicleManufachuredYear"
          value={VehicleManufachuredYear}
          onChange={e => setVehicleManufachuredYear(e.target.value)}
        />
      </Grid>

      <Grid item md={7}>
        <Button
          variant="contained" sx={{ mt: 3, width: "50%" }}
          onClick={() => isEdit ? updateVehicle({ ChassisNo, VehicleType, VehicleManufachuredYear, VehicleBrand, VehicleNo }) : addVehicle({ ChassisNo, VehicleType, VehicleManufachuredYear, VehicleBrand, VehicleNo })}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Grid>
    </Grid>
  );
}

export default VehicleForm;

