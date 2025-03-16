import React, { useState } from "react";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import axios from "axios";
import { GET_ALL_PAYMENTS_BY_MONTH } from "../../EndPoints";
import { errorAlert } from "../../utils.js";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";


function FinancialReport() {

    const theme = useTheme();
    const [month, setMonth] = useState("");
    const [tableData, setTableData] = useState({
        columns: [],
        rows: [],
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(GET_ALL_PAYMENTS_BY_MONTH + month, {})
            .then((response) => {
                generatePDF(month, response.data.compTransaction, response.data.custTransaction);
            })
            .catch((error) => {
                console.log(error)
                // errorAlert("Error getting Paymnts");
                errorAlert(error.response.data.message);
            });
    };

    const generatePDF = (month, compTransaction, custTransaction) => {

        const doc = new jsPDF();
        let compTotal = 0, cusTotal = 0;

        //Company Transactions Table
        const tableHead = [["Date", "Type", "PayFrom", "PayTo", "Regarding", "Description", "Amount"]];
        const tableBody = [];
        compTransaction.forEach((transaction) => {
            const row = [
                moment(transaction.date).format('MMMM Do YYYY, h:mm:ss a'),
                transaction.paymentType,
                transaction.payFrom,
                transaction.payTo,
                transaction.regarding,
                transaction.description,
                transaction.amount,
            ];
            tableBody.push(row);
            compTotal += parseInt(transaction.amount);
        });

        //Customer Payments Table
        const tableHead2 = [["Date", "CustomerId", "SiteId", "month", "Description", "Amount"]];
        const tableBody2 = [];
        custTransaction.forEach((transaction) => {
            const row = [
                moment(transaction.date).format('MMMM Do YYYY, h:mm:ss a'),
                transaction.customerId,
                transaction.siteId,
                transaction.month,
                transaction.description,
                transaction.amount,
            ];
            tableBody2.push(row);
            cusTotal += transaction.amount;
        });

        const topic = "Financial Report for " + month;
        doc.text(topic, 70, 10);

        doc.text('Company Transactions', 10, 30);
        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 35,
        });

        doc.text('Customer Payments', 10, doc.previousAutoTable.finalY + 16);
        doc.autoTable({
            head: tableHead2,
            body: tableBody2,
            startY: doc.previousAutoTable.finalY + 20,
        });

        doc.addPage();
        doc.text('Company Transactions Total : ' + compTotal, 10, 30);

        doc.text('Customer Transactions : ' + cusTotal, 10, 40);

        if(cusTotal > compTotal){
            doc.text('Net Profit : ' + (cusTotal - compTotal), 10, 50);
        }else{
            doc.text('Net Loss : ' + (compTotal - cusTotal), 10, 50);
        }

        doc.save("financial_report.pdf");
    };


    return (
        <Grid
            container
            sx={theme.palette.gridBody}
            spacing={2}
        >
            <Grid item md={12}>
                <Typography variant="h5" gutterBottom>
                    Financial Report
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoFocus
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </Grid>
            <Grid item md={6}>.</Grid>

            <Grid item md={6}>
                <Button variant="contained" onClick={(e) => handleSubmit(e)}>
                    Generate Report
                </Button>
            </Grid>
        </Grid>
    );

}

export default FinancialReport;