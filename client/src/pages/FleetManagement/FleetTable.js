import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, tableCellClasses, TablePagination, TableHead, TableRow, useTheme, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from '@mui/material/styles';
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';
import { scrollPage } from '../../utils';

const FleetTable = ({ fleetDetails, pendingRequests, selectedUser, deleteFleetDetail, selectedTransport }) => {

    const theme = useTheme();
    //---------------------Table Functions---------------------------
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
    //---------------------Table Functions---------------------------

    const [rows, setRows] = useState([]);
    const [selectedValue, setSelectedValue] = useState();

    const handleUpdate = (content) => {
        selectedUser(content);
        scrollPage(0);
    };

    const handleTransport = (content) => {
        selectedTransport(content);
    };

    const getInBetweens = () => {
        const inBetweens = [];
        fleetDetails.map(row => {
            const currentTime = moment();
            const startTime = moment(row.Start);
            const endTime = moment(row.EstimatedEnd);
            const isBetween = currentTime.isBetween(startTime, endTime);
            if (isBetween) {
                inBetweens.push(row);
            }
        });
        setRows(inBetweens);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setRows([]);
        switch (event.target.value) {
            case "all":
                setRows(fleetDetails)
                break;

            case "now":
                getInBetweens(fleetDetails)
                break;

            case "pending":
                break;

            default:
                break;
        }
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        const tableHead = [
            ['Vehicle Type', 'Vehicle No', 'Driver ID', 'Driver Mobile No', 'Purpose', 'Transport Location', 'Transport Root', 'Start', 'End'],
        ];
        const tableBody = [];
        fleetDetails.forEach((fleet) => {
            const fleetData = [
                fleet.VehicleType,
                fleet.VehicleNo,
                fleet.DriverId,
                fleet.DriverMobileNo,
                fleet.Purpose,
                fleet.TransportLocation,
                fleet.TransportRoot,
                fleet.Start,
                fleet.End,

            ];
            tableBody.push(fleetData);
        });
        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 20,
        });
        doc.save("fleetDetails.pdf");
    };

    return (
        <Box sx={theme.palette.gridBody}>
            <RadioGroup value={selectedValue} onChange={handleChange} row>
                <FormControlLabel value="all" control={<Radio />} label="All Transports" />
                <FormControlLabel value="now" control={<Radio />} label="Now Happening" />
                <FormControlLabel value="pending" control={<Radio />} label="Pending Stock Reuests" />
            </RadioGroup>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                {(selectedValue === "all" || selectedValue === "now") && (
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Vehicle Type</StyledTableCell>
                                <StyledTableCell>Vehicle No</StyledTableCell>
                                <StyledTableCell>Driver ID</StyledTableCell>
                                <StyledTableCell>Driver Mobile No</StyledTableCell>
                                <StyledTableCell>Purpose</StyledTableCell>
                                <StyledTableCell>Transport Location</StyledTableCell>
                                <StyledTableCell>Transport Root</StyledTableCell>
                                <StyledTableCell>Start</StyledTableCell>
                                <StyledTableCell>Estimated End</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.length > 0 ? rows.map(row => (
                                    <StyledTableRow key={row.VehicleNo}>
                                        <StyledTableCell>{row.VehicleType}</StyledTableCell>
                                        <StyledTableCell>{row.VehicleNo}</StyledTableCell>
                                        <StyledTableCell>{row.DriverId}</StyledTableCell>
                                        <StyledTableCell>{row.DriverMobileNo}</StyledTableCell>
                                        <StyledTableCell>{row.Purpose}</StyledTableCell>
                                        <StyledTableCell>{row.TransportLocation}</StyledTableCell>
                                        <StyledTableCell>{row.TransportRoot}</StyledTableCell>
                                        <StyledTableCell>{moment(row.Start).format('YYYY-MM-DD  h:mm a')}</StyledTableCell>
                                        <StyledTableCell>{moment(row.EstimatedEnd).format('YYYY-MM-DD  h:mm a')}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button sx={{ margin: '0px 10px' }}
                                                onClick={() => handleUpdate({ row })}
                                            >
                                                Upadate

                                            </Button>
                                            <Button sx={{ margin: '0px 10px' }}
                                                onClick={() => deleteFleetDetail({ VehicleNo: row.VehicleNo })}
                                            >
                                                Delete

                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) : (
                                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell>No Data</StyledTableCell>
                                    </StyledTableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                )}

                {(selectedValue === "pending") && (
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Site Id</StyledTableCell>
                                <StyledTableCell>Equipments</StyledTableCell>
                                <StyledTableCell>Requested Date</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pendingRequests.length > 0 ? pendingRequests.map(row => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell>{row.siteId}</StyledTableCell>
                                        <StyledTableCell>
                                            {row.equipments.map((equipment, index) => (
                                                <span key={index}>
                                                    {`${equipment.equipmentId}: ${equipment.qty}`}
                                                    {index !== row.equipments.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </StyledTableCell>

                                        <StyledTableCell>{moment(row.date).format('YYYY-MM-DD  h:mm a')}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button sx={{ margin: '0px 10px' }}
                                                onClick={() => handleTransport({ row })}
                                            >
                                                Transport

                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) : (
                                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell>No Data</StyledTableCell>
                                    </StyledTableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                )}
                <TablePagination
                    sx={{ backgroundColor: theme.palette.primary.main, }}
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }} onClick={() => generatePDFReport()}>
                Generate Report
            </Button>
        </Box>
    );
}

export default FleetTable;