import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert } from '../../utils';
import { Grid } from "@mui/material";
import { SEARCH_PACKAGE } from '../../EndPoints';
import ViewPackageDetails from './ViewPackageDetails';


const PackageList = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [packageId, setPackageId] = useState(false);

  useEffect(() => {
    const loadPackages = async () => {
      axios
        .get(SEARCH_PACKAGE, {})
        .then((response) => {
          setPackageDetails(response.data);
        })
        .catch((error) => {
          errorAlert("Error Getting Packages");
          errorAlert(error.response.data.message);
        });
    };
    loadPackages();
  }, [navigate]);

  const handleClick = (packageId) => {
    setPackageId(packageId);
    setIsSelected(true);
  };

  return (
    <Grid
      container
      sx={theme.palette.gridBody}
    >
      {!isSelected &&
        <Grid item md={12}>
          <ImageList sx={{ width: '100%', height: '100%' }}>
            {packageDetails.map((row) => (
              <ImageListItem key={row.packageId}>
                <img
                  srcSet={`${row.homeImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${row.homeImage}?w=248&fit=crop&auto=format`}
                  alt={row.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={row.name}
                  subtitle={`Rs. ${row.cost}.00`}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${row.name}`}
                      onClick={() => handleClick(row._id)}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      }

      {isSelected &&
        <Grid item md={12}>
          <ViewPackageDetails packageId={packageId} />
        </Grid>
      }

    </Grid>
  );

}

export default PackageList;