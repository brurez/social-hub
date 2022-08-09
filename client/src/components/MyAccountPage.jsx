import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useCurrentUser} from "../hooks/useCurrentUser.js";
import {useUpdateUserProfile} from "../hooks/useUpdateUserProfile.js";
import useMessage from "../hooks/useMessage.jsx";
import Models from "../lib/Models.js";
import {useGetUserProfile} from "../hooks/useGetUserProfile.js";

export default function MyAccountPage() {

  const {showErrorMessage, showSuccessMessage} = useMessage();
  const {currentUser, setCurrentUser} = useCurrentUser()
  const {data: profile, isLoading: isProfileLoading} = useGetUserProfile()
  const {mutate: updateUserProfile} = useUpdateUserProfile({
    onSuccess: async () => {
      showSuccessMessage("You have successfully updated your profile!");
      const res = await Models.build().getCurrentUser();
      setCurrentUser(res.data);
    },
    onError: ({response}) => {
      showErrorMessage(response.data.error.message)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      biography: formData.get('biography'),
      location: formData.get('location'),
      profilePic: formData.get('profilePic'),
    }
    updateUserProfile(data);
  }

  if (!currentUser) return <div>Loading...</div>

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800
      }}
    >
      <Typography component="h1" variant="h5">
        General ({currentUser.email})
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={currentUser.firstName}
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
              defaultValue={currentUser.lastName}
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          {!isProfileLoading && (
            <>
              <Grid item xs={12}>
                <TextField
                  defaultValue={profile.biography}
                  multiline
                  rows={4}
                  fullWidth
                  name="biography"
                  label="Biography"
                  id="biography"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={profile.location}
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  id="location"
                />
              </Grid>
            </>

          )}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}