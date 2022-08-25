import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SignUpPage from "./components/SignUpPage.jsx";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {StoreProvider} from "./store/StoreProvider";
import Message from "./components/Message.jsx";
import SignInPage from "./components/SignInPage.jsx";
import {UserInitializer} from "./UserInitializer";
import MyAccountPage from "./components/MyAccountPage";
import {CreatePostPage, EditPostPage, ShowPostPage} from "./components/PostPages.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ChatDrawer from "./components/ChatDrawer";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline/>
          <UserInitializer/>
          <Router>
            <Container maxWidth="lg">
              <Header title="F1 Social Hub"/>
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/my-account" element={<MyAccountPage/>}/>
                <Route path="/posts/create" element={<CreatePostPage/>}/>
                <Route path="/posts/:postId/edit" element={<EditPostPage/>}/>
                <Route path="/posts/:postId" element={<ShowPostPage/>}/>
                <Route path="/profiles/:profileId" element={<ProfilePage/>}/>
              </Routes>
            </Container>
          </Router>
          <Footer
            title="Social Hub App"
            description="Because we need even more social media networks in the world."
          />
          <ChatDrawer/>
        </QueryClientProvider>
        <Message/>
      </StoreProvider>
    </ThemeProvider>
  );
}