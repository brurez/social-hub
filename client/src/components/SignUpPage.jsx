import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useSignUp} from "../hooks/useSignUp.js";
import useMessage from "../hooks/useMessage.jsx";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import FormSection from "./FormSection";

export default function SignUpPage() {
  const {showErrorMessage, showSuccessMessage} = useMessage();
  const navigate = useNavigate()
  const {mutate: signUp} = useSignUp({
    onError: ({response}) => {
      showErrorMessage(response.data.error.message)
    },
    onSuccess: () => {
      showSuccessMessage("You have successfully signed up!");
      navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      password2: formData.get('password2'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    }
    signUp(data);
  }

  return (
    <FormSection>
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password2"
              label="Repeat the password"
              type="password"
              id="password2"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <RouterLink to={'/signin'}>
              <Link variant="body2">
                Already have an account? Sign in
              </Link>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </FormSection>
  );
}
