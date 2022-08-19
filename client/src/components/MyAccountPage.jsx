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
import {DEFAULT_PROFILE_PIC, SERVER_URL} from "../../env.js";
import {useNavigate} from "react-router-dom";
import FormSection from "./FormSection";

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

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    updateUserProfile(formData);
  }

  if (!currentUser) return <div>Loading...</div>

  return (
    <FormSection>
      <Typography component="h1" variant="h5">
        My Account ({currentUser.email})
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
              <Grid item xs={12} ml={1}>
                <Typography variant="caption" color={"text.secondary"} mr={2}>Profile picture</Typography>
                <input type={"file"} name={"profilePic"} id={"profilePic"} />
              </Grid>
              <Grid item xs={12} ml={1}>
                <img height={200} src={(SERVER_URL + profile.profilePic) || DEFAULT_PROFILE_PIC} alt={"profile pic"} />
              </Grid>
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
        <Box mt={3} display={"flex"} justifyContent={"space-around"}>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          sx={{width: "30%"}}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{width: "30%"}}
        >
          Save
        </Button>
        </Box>
      </Box>
    </FormSection>
  );
}