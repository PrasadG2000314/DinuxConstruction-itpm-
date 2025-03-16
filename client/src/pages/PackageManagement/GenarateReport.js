import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardMedia, Typography, Stack, Button, Box } from '@mui/material';
import {useReactToPrint} from "react-to-print";
import { successAlert } from "../../utils";

const GenarateReport = (props) => {
    const location = useLocation();

    const componentRef = useRef();
    const navigate = useNavigate();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        DocumentTitle:"User Report",
        onafterprint:()=>successAlert("User Report Successfully Download !"),
    })

    return(
     
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Card sx={{ width: '794px', height: '1123px', position: 'relative', mt:15}} >
                <div ref={componentRef}>   
                    <Box sx={{ mt: 3, ml: 2, mt:5}}>
                        <h2>
                            Customer Details:
                        </h2>
                        <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                            Customer Name:
                            <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                            {` ${location.state.firstName} ${location.state.lastName}`}
                            </Typography>
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                            Customer Id:
                            <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                            {` ${location.state.cusId}`}
                            </Typography>
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                            Address:
                            <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                            {` ${location.state.street}, ${location.state.city}`}
                            </Typography>
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                            Mobile Number:
                            <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                            {` ${location.state.mobileNo}`}
                            </Typography>
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                            Email:
                            <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                            {` ${location.state.email}`}
                            </Typography>
                        </Typography>
                    </Box>  

                    <Box sx={{ mt: 3, ml: 2, mt:5}}>
                        <div>
                            <h2 >
                                Package Details:
                            </h2>
                        </div>
                        <div>
                            <CardMedia
                            component="img"
                            sx={{ width: '644px', height: '350px', position: 'absolute', left: '70px' }}
                            image={location.state.image}
                        />
                        </div>
                        <div>
                            <Typography variant="h5" sx={{ mb: 2, ml: '70px', mt: '400px'}}>
                                Package Name:
                                <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                                {` ${location.state.packageName}`}
                                </Typography>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                                Duration:
                                <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                                {` ${location.state.duration}`}
                                </Typography>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                                Add Ons:
                                <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                                {` ${location.state.description}`}
                                </Typography>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                                Price:
                                <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                                {` Rs.  ${location.state.price}.00`}
                                </Typography>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 2, ml: '70px' }}>
                                Payment/Mo:
                                <Typography variant="h5" sx={{ mb: 2, display: 'inline' }}>
                                {` Rs.  ${location.state.mcost}.00`}
                                </Typography>
                            </Typography>
                        </div>
                    </Box>

                </div>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ position: 'absolute', bottom: '20px', left: '70px' }}
                >
                    <Button
                        variant="contained"
                        onClick={handlePrint}
                        sx={{ width: "150px" }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/userDashboard")}
                        sx={{ width: "150px" }}
                    >
                        Dashboard
                    </Button>
                </Stack>

            </Card>
        </Box>  
    )
}
export default  GenarateReport;