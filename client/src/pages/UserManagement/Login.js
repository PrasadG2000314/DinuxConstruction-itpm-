import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useTheme
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../EndPoints";
import { setCredentials } from '../../state';
import { useDispatch } from 'react-redux';
import { userTypes, errorAlert, timedSuccessAlert } from "../../utils";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(LOGIN, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        dispatch(setCredentials({ user, token }));
        navigate('/userDashboard');

      })
      .catch((error) => {
        errorAlert("Incorect Credentials");
        console.log(error);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(img/login-side-img.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 15
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 15 }}
            >
              &copy; {new Date().getFullYear()} All rights reserved | Apex
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
