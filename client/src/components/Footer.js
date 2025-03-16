import React from "react";
import { Box, Container, Grid, Link, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        backgroundColor: theme.palette.background.default,
        backgroundImage: "url(/img/bg-img.jpg)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ backgroundColor: theme.palette.background.transparent, padding: "2em 0 0 0", }}>
        <img
          alt="logo"
          src="/img/logo.png"
          style={{ height: 80, width: 200 }}
        />
        <Grid container spacing={3} style={{ margin: "2em 0 2em 2em" }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              component="h4"
              sx={{
                marginBottom: "2em",
                color: theme.palette.text.default,
                fontSize: "20px",
                fontWeight: "500",
                fontFamily: theme.palette.typography.poppins,
                textAlign: "justify"
              }}
            >
              Apex Construction is committed to advancing the construction
              industry by improving the lives of people working in construction,
              driving technology innovation, and building a global community of
              groundbreakers. Our connected global construction platform unites
              all stakeholders on a project with unlimited access to support and
              a business model designed for the construction industry
            </Typography>
          </Grid>
          <Grid item xs={0} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              component="h4"
              sx={{
                marginBottom: "2em",
                color: theme.palette.text.default,
                fontSize: "20px",
                fontWeight: "500",
                fontFamily: theme.palette.typography.poppins
              }}
            >
              New to Apex?
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  Be a Customer
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              component="h4"
              style={{
                marginBottom: "2em",
                color: theme.palette.text.default,
                fontSize: "20px",
                fontWeight: "500",
                fontFamily: "Heebo, sans-serif",
              }}
            >
              New to Apex?
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li style={{ marginBottom: "1em" }}>
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    WebkitTextDecorationSkip: "objects",
                    color: theme.palette.text.grey,
                    fontSize: "16px",
                    fontWeight: "normal",
                    transition: "all 300ms linear 0s",
                    cursor: "pointer",
                  }}
                >
                  FeedBack
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>



        <Grid container sx={{ marginLeft: "5em" }}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.grey }}
              fontSize="16px"
            >
              &copy; {new Date().getFullYear()} All rights reserved | Apex
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
