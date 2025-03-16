import { Box } from "@mui/material";
import VehicleForm from "./VehcileForm.js";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import VehicleTable from './VehicleTable.js';
import { CREATE_VEHCILE, DELETE_VEHCILE, SEARCH_VEHCILE, UPDATE_VEHCILE } from "../../EndPoints";

const Vehicles = () => {
  const [Vehicles, setVehicles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = () => {
    Axios.get(SEARCH_VEHCILE)
      .then(response => {
        setVehicles(response.data ? response.data : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const addVehicle = (data) => {
    setSubmitted(true);
    const payload = {
      ChassisNo: data.ChassisNo,
      VehicleType: data.VehicleType,
      VehicleManufachuredYear: data.VehicleManufachuredYear,
      VehicleBrand: data.VehicleBrand,
      VehicleNo: data.VehicleNo,
    }

    Axios.post(CREATE_VEHCILE, payload)
      .then(() => {
        getVehicles();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateVehicle = (data) => {
    setSubmitted(true);
    const payload = {
      ChassisNo: data.ChassisNo,
      VehicleType: data.VehicleType,
      VehicleManufachuredYear: data.VehicleManufachuredYear,
      VehicleBrand: data.VehicleBrand,
      VehicleNo: data.VehicleNo,
    }
    Axios.put(UPDATE_VEHCILE, payload)
      .then(() => {
        getVehicles();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const deleteVehicle = (data) => {
    Axios.delete(DELETE_VEHCILE + data.ChassisNo)
      .then(() => {
        getVehicles();
        successAlert("Data Deleted Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const handleUpdate = (content) => {
    setSelectedVehicle(content.row);
    setIsEdit(true);
  }

  return (
    <Box>
      <VehicleForm
        addVehicle={addVehicle}
        updateVehicle={updateVehicle}
        submitted={submitted}
        data={selectedVehicle}
        isEdit={isEdit}
      />
      <VehicleTable
        rows={Vehicles}
        selectedUser={handleUpdate}
        deleteVehicle={data => {
          window.confirm("Are you sure?") && deleteVehicle(data);
        }}
      />
    </Box>
  );
}

export default Vehicles;
