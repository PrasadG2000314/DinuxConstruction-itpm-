import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableHead, TableBody, TableRow, TableCell, tableCellClasses, TableContainer, Paper, TablePagination, useTheme } from "@mui/material";

export default function CustomizedTable({ columns, rows }) {
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
        <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <StyledTableCell key={index}>{column}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <StyledTableCell key={cellIndex} align="left">
                                    {cell}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                sx={{ backgroundColor: theme.palette.primary.main, }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={columns.length}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
