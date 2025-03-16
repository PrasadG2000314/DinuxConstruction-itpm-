import React, { useState } from "react";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import axios from "axios";
import { GET_LOG_REPORT } from "../../EndPoints";
import { errorAlert } from "../../utils.js";
import CustomizedTable from "../../components/Table";
import jsPDF from "jspdf";
import "jspdf-autotable";


function LogReport() {

    const theme = useTheme();
    const [showGrid, setShowGrid] = useState(false);
    const [searchData, setsearchData] = useState({
        month: "",
        userId: "all",
    });
    const [tableData, setTableData] = useState({
        columns: [],
        rows: [],
    });

    const handleChange = (field, value) => {
        setsearchData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const getUserId = (msg) => {
        const regex = /\[([^\]]+)\]/;
        const match = regex.exec(msg);
        return match ? match[1] : 'NAA';
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .get(GET_LOG_REPORT + "/" + searchData.month + "/" + searchData.userId, {})
            .then((response) => {
                const logsArray = response.data;
                const columns = ['Level', 'Time', 'User ID', 'Message'];
                const rows = logsArray.map(log => ({
                    Level: log.level,
                    Time: log.time,
                    'User ID': getUserId(log.msg),
                    Message: log.msg
                }));
                setTableData({ columns, rows });
                setShowGrid(true);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableHead = [tableData.columns];
        const tableBody = [];
        tableData.rows.forEach((log) => {
            const logData = [
                log.Level,
                log.Time,
                log['User ID'],
                log.Message,
            ];
            tableBody.push(logData);
        });
        const columnStyles = {
            0: { columnWidth: 30 },
            1: { columnWidth: 40 },
            2: { columnWidth: 30 },
            3: { columnWidth: 80, cellStyles: { fontSize: 8, cellWidth: 'wrap' } },
        };

        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 20,
            columnStyles: columnStyles,
        });

        doc.save("log_report.pdf");
    };


    return (
        <Grid container>
            <Grid
                item md={11}
                spacing={2}
                component="form"
                sx={theme.palette.gridBody}
                noValidate
                onSubmit={handleSubmit}
            >
                <Grid item md={12}>
                    <Typography variant="h5" gutterBottom>
                        Log Report
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <TextField
                        margin="normal"
                        type="month"
                        required
                        fullWidth
                        id="month"
                        name="month"
                        label="Month"
                        autoComplete="month"
                        autoFocus
                        onChange={(e) => handleChange('month', e.target.value)}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User Id"
                        name="userId"
                        autoComplete="userId"
                        onChange={(e) => handleChange('userId', e.target.value)}
                    />
                </Grid>

                <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                    View
                </Button>
            </Grid>
            {showGrid && (
                <Grid item md={11} sx={theme.palette.gridBody}>
                    <CustomizedTable columns={tableData.columns} rows={tableData.rows} />
                    <Button onClick={generatePDF} variant="contained" sx={{ mt: 3, width: "50%", ml: 1 }}>
                        Generate PDF
                    </Button>
                </Grid>
            )}
        </Grid>
    );

}

export default LogReport;