import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from "./store/StoreProvider";
import Message from "./components/Message.jsx";
import SignInPage from "./components/SignInPage.jsx";
import { UserInitializer } from "./UserInitializer";
import EditProfileHomePage from "./components/EditProfileHomePage.jsx";
import {
  CreatePostPage,
  EditPostPage,
  ShowPostPage,
} from "./components/PostPages.jsx";
import ProfileHomePage from "./components/ProfileHomePage.jsx";
import ChatDrawer from "./components/ChatDrawer";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Main app component
// This component is the top level component of the app.
// It contains the header, footer, and the main content.
// The main content is rendered by the Routes component.
// The Routes component is responsible for rendering the appropriate page for the current URL.

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <UserInitializer />
          <Router>
            <Container maxWidth="lg">
              <Header title="F1 Social Hub" />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/edit-profile" element={<EditProfileHomePage />} />
                <Route path="/posts/create" element={<CreatePostPage />} />
                <Route path="/posts/:postId/edit" element={<EditPostPage />} />
                <Route path="/posts/:postId" element={<ShowPostPage />} />
                <Route
                  path="/profiles/:profileId"
                  element={<ProfileHomePage />}
                />
              </Routes>
            </Container>
          </Router>
          <Footer
            title="Social Hub App"
            description="Because we need even more social media networks in the world."
          />
          <ChatDrawer />
        </QueryClientProvider>
        <Message />
      </StoreProvider>
    </ThemeProvider>
  );
}
