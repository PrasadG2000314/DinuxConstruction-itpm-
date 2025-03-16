import React, { useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, tableCellClasses, TablePagination, TableHead, TableRow, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { scrollPage } from '../../utils';

const VehicleTable = ({ rows, selectedUser, deleteVehicle }) => {

    const theme = useTheme();
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

    const handleUpdate = (content) => {
        selectedUser(content);
        scrollPage(0);
    };

    return (
        <Box sx={theme.palette.gridBody}>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Vehicle No</StyledTableCell>
                            <StyledTableCell>Vehicle Type</StyledTableCell>
                            <StyledTableCell>Vehicle Brand</StyledTableCell>
                            <StyledTableCell>Vehicle Manufachured Year</StyledTableCell>
                            <StyledTableCell>Chassis No</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.length > 0 ? rows.map(row => (
                                <StyledTableRow key={row.ChassisNo}>
                                    <StyledTableCell>{row.VehicleNo}</StyledTableCell>
                                    <StyledTableCell>{row.VehicleType}</StyledTableCell>
                                    <StyledTableCell>{row.VehicleBrand}</StyledTableCell>
                                    <StyledTableCell>{row.VehicleManufachuredYear}</StyledTableCell>
                                    <StyledTableCell>{row.ChassisNo}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button sx={{ margin: '0px 10px' }}
                                            onClick={() => handleUpdate({ row })}
                                        >
                                            Upadate

                                        </Button>
                                        <Button sx={{ margin: '0px 10px' }}
                                            onClick={() => deleteVehicle({ ChassisNo: row.ChassisNo })}
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
        </Box>
    );
}

export default VehicleTable;