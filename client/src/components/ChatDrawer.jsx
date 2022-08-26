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
import { useRef } from "react";
import { Message } from "./ChatMessage.jsx";

// styles for the chat drawer
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

// Component that renders the message input at the bottom of the chat drawer
function ChatInput({ onSend }) {
  // handles message input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.message.value;
    onSend(text);
    e.target.elements.message.value = "";
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
        mb={1}
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

// Component that renders the chat drawer. It contains the messages and the message input.
export default function ChatDrawer() {
  const messageBottom = useRef(null);
  const { currentUser } = useCurrentUser();
  const { isOpen, closeChatDrawer, user2Id } = useChatDrawer();
  const { messages, sendMessage, user2 } = useChatMessages({
    user1Id: currentUser ? currentUser.id : null,
    user2Id,
    // scrolls the message window to the bottom when a new message is received
    onMessage: messageBottom.current?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    }),
  });

  const classes = useStyles();

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={closeChatDrawer}>
      <div className={classes.container}>
        <Paper className={classes.paper} zDepth={2}>
          <Typography variant="h6" component="h3" gutterBottom>
            Chat with {user2 && user2.firstName} {user2 && user2.lastName}
          </Typography>
          <Typography variant="body2" component="p">
            1. Open an anonymous browser window. <br/>
            2. Sign in as {user2 && user2.firstName} {user2 && user2.lastName}. <br/>
          3. Click to the chat button next {currentUser && currentUser.firstName} {currentUser && currentUser.lastName} name. <br/>
          </Typography>
          <Paper className={classes.messagesBody}>
            {currentUser
              ? messages.map((message) => (
                  <Message
                    message={message}
                    user1Id={currentUser.id}
                    key={message.createdAt}
                  />
                ))
              : []}
            <div ref={messageBottom} style={{ height: 1 }} />
          </Paper>
          <ChatInput onSend={(text) => sendMessage(text)} />
        </Paper>
      </div>
    </Drawer>
  );
}
