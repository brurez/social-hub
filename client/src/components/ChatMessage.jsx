import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Component that renders the message body on the chat drawer
function MessageBody({ message }) {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        {message.text}
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="body2" gutterBottom>
          {message.user.firstName} {message.user.lastName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {new Date(message.createdAt * 1000).toLocaleString()}
        </Typography>
      </Box>
    </>
  );
}

// Specific message component for the current user
function User1Message({ message }) {
  return (
    <Box p={1} bgcolor="success.main" m={1} mr={6} borderRadius={2}>
      <MessageBody message={message} />
    </Box>
  );
}

// Specific message component for the other user
function User2Message({ message }) {
  return (
    <Box p={1} bgcolor="warning.main" m={1} ml={6} borderRadius={2}>
      <MessageBody message={message} />
    </Box>
  );
}

// Component that renders the message on the chat drawer
export function Message({ message, user1Id }) {
  return message.user.id === user1Id ? (
    <User1Message message={message} />
  ) : (
    <User2Message message={message} />
  );
}
