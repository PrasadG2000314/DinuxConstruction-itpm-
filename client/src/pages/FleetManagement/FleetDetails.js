import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import FleetTable from './FleetTable.js';
import { CREATE_FLEET, DELETE_FLEET, GET_STOCK_REQUESTS_BY_STATUS, SEARCH_FLEET, UPDATE_FLEET, UPDATE_STOCK_REQUEST_STATUS } from "../../EndPoints";


const FleetDetails = () => {
  const [FleetDetails, setFleetDetails] = useState([]);
  const [pendingStockRequsts, setPendingStockRequsts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetDetail, setSelectedFleetDetail] = useState({});
  const [selectedTransport, setSelectedTransport] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getFleetDetails();
    getPendingStockRequsts();
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

  const getPendingStockRequsts = () => {
    Axios.get(GET_STOCK_REQUESTS_BY_STATUS + "false")
      .then(response => {
        setPendingStockRequsts(response.data ? response.data : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const addFleetDetail = (data) => {
    setSubmitted(true);
    const payload = {
      VehicleType: data.VehicleType,
      VehicleNo: data.selectedVehicleNo,
      DriverId: data.DriverId,
      Purpose: data.Purpose,
      DriverMobileNo: data.DriverMobileNo,
      TransportLocation: data.TransportLocation,
      TransportRoot: data.TransportRoot,
      Start: data.Start,
      EstimatedEnd: data.EstimatedEnd,
    }

    Axios.post(CREATE_FLEET, payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateFleetDetail = (data) => {
    setSubmitted(true);
    const payload = {
      VehicleType: data.VehicleType,
      VehicleNo: data.selectedVehicleNo,
      DriverId: data.DriverId,
      Purpose: data.Purpose,
      DriverMobileNo: data.DriverMobileNo,
      TransportLocation: data.TransportLocation,
      TransportRoot: data.TransportRoot,
      Start: data.Start,
      EstimatedEnd: data.EstimatedEnd,
    }
    Axios.put(UPDATE_FLEET, payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const deleteFleetDetail = (data) => {
    Axios.delete(DELETE_FLEET + data.VehicleNo)
      .then(() => {
        getFleetDetails();
        successAlert("Data Deleted Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const handleUpdate = (content) => {
    setSelectedFleetDetail(content.row);
    setIsEdit(true);
  }

  const handleSelectedTransport = (content) => {
    setSelectedTransport(content.row);

    Axios.put(UPDATE_STOCK_REQUEST_STATUS, { id: content.row._id, status: true })
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  return (
    <Box>
      <FleetForm
        addFleetDetail={addFleetDetail}
        updateFleetDetail={updateFleetDetail}
        submitted={submitted}
        data={selectedFleetDetail}
        transport={selectedTransport}
        isEdit={isEdit}
      />
      <FleetTable
        fleetDetails={FleetDetails}
        pendingRequests={pendingStockRequsts}
        selectedUser={handleUpdate}
        selectedTransport={handleSelectedTransport}
        deleteFleetDetail={data => {
          window.confirm("Are you sure?") && deleteFleetDetail(data);
        }}
      />
    </Box>
  );
}

export default FleetDetails;
