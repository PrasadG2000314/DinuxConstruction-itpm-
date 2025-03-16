import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, TablePagination ,tableCellClasses} from "@mui/material";
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const SimpleFleetTable = ({ rows = [], selectedUser, handleAccept, handleFinish }) => {
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

  return (
    <Box>
      {rows.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Vehicle Type</StyledTableCell>
                <StyledTableCell>Vehicle No</StyledTableCell>
                <StyledTableCell>Driver ID</StyledTableCell>
                <StyledTableCell>Driver Mobile No</StyledTableCell>
                <StyledTableCell>Transport Materials</StyledTableCell>
                <StyledTableCell>Transport Location</StyledTableCell>
                <StyledTableCell>Transport Root</StyledTableCell>
                <StyledTableCell>Estimated Time</StyledTableCell>
                
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.VehicleNo}>
                  <StyledTableCell>{row.VehicleType}</StyledTableCell>
                  <StyledTableCell>{row.VehicleNo}</StyledTableCell>
                  <StyledTableCell>{row.DriverId}</StyledTableCell>
                  <StyledTableCell>{row.DriverMobileNo}</StyledTableCell>
                  <StyledTableCell>{row.TransportMaterials}</StyledTableCell>
                  <StyledTableCell>{row.TransportLocation}</StyledTableCell>
                  <StyledTableCell>{row.TransportRoot}</StyledTableCell>
                  <StyledTableCell>{row.EstimatedTime}</StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Box>No data available</Box>
      )}
    </Box>
  );
}

export default SimpleFleetTable;
