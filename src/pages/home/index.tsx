import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Logo } from "../../functions/images";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../core/api";
import { Alert, AlertColor, Snackbar } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = object({
    email: string().min(1, "Field is required!"),
    password: string().min(1, "Field is required!"),
  });
  const [notification, setNotification] = React.useState<{
    serverity: AlertColor;
    open: boolean;
    message: string;
  }>({ serverity: "success", open: false, message: "" });

  const handleNotification = (serverity: AlertColor, message: string) => {
    setNotification({ serverity: serverity, open: true, message: message });
  };

  const handleNotificationClose = () => {
    setNotification({
      serverity: notification.serverity,
      open: false,
      message: notification.message,
    });
  };

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    try {
      console.log(values);
      let res = await login(values);
      if (res.status == 200) {
        window.location.href = "/home";
      } else {
        handleNotification("error", res.data?.message);
      }
    } catch (e: any) {
      handleNotification("error", e?.message);
    }
  };

  return (
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Box
            component="img"
            src="https://source.unsplash.com/random?wallpapers"
            sx={{
              display: "flex",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={Logo}
              sx={{
                m: 1,
                borderRadius: "0px",
                width: "100px",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors["email"]}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors["password"]}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.serverity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
