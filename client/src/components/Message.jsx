import useMessage from "../hooks/useMessage";
import { Alert, Snackbar } from "@mui/material";

// component to show a success or error message at the bottom of the screen
export default function Message() {
  const { message } = useMessage();

  return (
    <Snackbar
      open={message.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={message.kind}>{message.text}</Alert>
    </Snackbar>
  );
}