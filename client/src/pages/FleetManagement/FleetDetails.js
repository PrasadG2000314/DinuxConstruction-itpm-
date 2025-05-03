import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import { errorAlert, successAlert } from "../../utils";
import FleetTable from './FleetTable.js';
import { CREATE_FLEET, DELETE_FLEET, GET_STOCK_REQUESTS_BY_STATUS, SEARCH_FLEET, UPDATE_FLEET, UPDATE_STOCK_REQUEST_STATUS } from "../../EndPoints";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
      {/* Real-time tracking map */}
      <MapComponent />
    </Box>
  );
}

// --- Real-time Tracking Map Component ---
const MapComponent = () => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([14.0860746, 100.608406], 6);

      // Add OSM tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);
    }

    function getPosition(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      // Remove previous marker/circle
      if (markerRef.current) leafletMapRef.current.removeLayer(markerRef.current);
      if (circleRef.current) leafletMapRef.current.removeLayer(circleRef.current);

      // Add new marker and circle
      markerRef.current = L.marker([lat, long]);
      circleRef.current = L.circle([lat, long], { radius: accuracy });

      const group = L.featureGroup([markerRef.current, circleRef.current]).addTo(leafletMapRef.current);
      leafletMapRef.current.fitBounds(group.getBounds());
    }

    let interval;
    if (navigator.geolocation) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
      }, 5000);
    }

    // Cleanup on unmount
    return () => {
      if (interval) clearInterval(interval);
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        width: '100%',
        height: '60vh',
        marginTop: 24,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default FleetDetails;
