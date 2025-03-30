import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import FleetTable from './FleetTable.js';
import { CREATE_FLEET, DELETE_FLEET, GET_STOCK_REQUESTS_BY_STATUS, SEARCH_FLEET, UPDATE_FLEET, UPDATE_STOCK_REQUEST_STATUS } from "../../EndPoints";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const FleetDetails = () => {
  const [FleetDetails, setFleetDetails] = useState([]);
  const [pendingStockRequsts, setPendingStockRequsts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetDetail, setSelectedFleetDetail] = useState({});
  const [selectedTransport, setSelectedTransport] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getFleetDetails();
    getPendingStockRequsts();
  }, []);

  useEffect(() => {
    // Initialize Map
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: fromLonLat([0, 0]),
        
        zoom: 10,
      }),
    });

    // Check for Geolocation Support
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.longitude, position.coords.latitude];
          setUserLocation(userCoords);

          const userLonLat = fromLonLat(userCoords);

          // Move map to user location
          map.getView().setCenter(userLonLat);
          map.getView().setZoom(15);

          // Create a marker for user location
          const userMarker = new Feature({
            geometry: new Point(userLonLat),
          });

          userMarker.setStyle(
            new Style({
              image: new Icon({
                src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Marker Icon
                scale: 0.1,
              }),
            })
          );

          const vectorSource = new VectorSource({
            features: [userMarker],
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          map.addLayer(vectorLayer);
        },
        (error) => {
          console.error("Error getting location:", error);
          errorAlert("Could not retrieve location.");
        }
      );
    } else {
      console.error("Geolocation not supported.");
      errorAlert("Geolocation is not supported in this browser.");
    }


    return () => {
      map.setTarget(null);
    };
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
      <Box style={{ width: '100%', height: '500px' }}> 
      <div id="map" class="map" tabindex="0" style={{ width: "100%", height: "100%" }}></div>
      </Box>
    </Box>
  );
}

export default FleetDetails;
