import { useChatDrawer } from "../hooks/useChatDrawer.js";
import { createStyles, Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Send } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import useChatMessages from "../hooks/useChatMessages.js";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);

function ChatInput({ onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.message.value;
    onSend(text);
  };
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        noValidate
        display={"flex"}
        width={"100%"}
        px={1}
      >
        <TextField label="Write here your message" name="message" fullWidth />
        <Button
          type={"submit"}
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
        >
          <Send />
        </Button>
      </Box>
    </>
  );
}

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
          {new Date(message.createdAt * 1000).toLocaleTimeString()}
        </Typography>
      </Box>
    </>
  );
}

function User1Message({ message }) {
  return (
    <Box p={1} bgcolor="success.main" m={1} mr={6} borderRadius={2}>
      <MessageBody message={message} />
    </Box>
  );
}

function User2Message({ message }) {
  return (
    <Box p={1} bgcolor="warning.main" m={1} ml={6} borderRadius={2}>
      <MessageBody message={message} />
    </Box>
  );
}

function Message({ message, user1Id }) {
  return message.user.id === user1Id ? (
    <User1Message message={message} />
  ) : (
    <User2Message message={message} />
  );
}

export default function ChatDrawer() {
  const { currentUser } = useCurrentUser();
  const { isOpen, closeChatDrawer, user2Id } = useChatDrawer();
  const { messages, sendMessage } = useChatMessages({
    user1Id: currentUser ? currentUser.id : null,
    user2Id,
  });
  const classes = useStyles();

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={closeChatDrawer}>
      <div className={classes.container}>
        <Paper className={classes.paper} zDepth={2}>
          <Paper className={classes.messagesBody}>
            {messages.map((message) => (
              <Message
                message={message}
                user1Id={currentUser.id}
                key={message.createdAt}
              />
            ))}
          </Paper>
          <ChatInput onSend={(text) => sendMessage(text)} />
        </Paper>
      </div>
    </Drawer>
  );
}
