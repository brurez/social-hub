import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './components/Header.jsx';
import MainFeaturedPost from './components/MainFeaturedPost.jsx';
import FeaturedPost from './components/FeaturedPost.jsx';
import Posts from './components/Posts.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import Main from "./components/Main.jsx";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {StoreProvider} from "./store/StoreProvider";
import Message from "./components/Message.jsx";

const queryClient = new QueryClient();

const sections = [
  {title: 'Technology', url: '#'},
  {title: 'Design', url: '#'},
  {title: 'Culture', url: '#'},
  {title: 'Business', url: '#'},
  {title: 'Politics', url: '#'},
  {title: 'Opinion', url: '#'},
  {title: 'Science', url: '#'},
  {title: 'Health', url: '#'},
  {title: 'Style', url: '#'},
  {title: 'Travel', url: '#'},
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const posts = [];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    {title: 'March 2020', url: '#'},
    {title: 'February 2020', url: '#'},
    {title: 'January 2020', url: '#'},
    {title: 'November 1999', url: '#'},
    {title: 'October 1999', url: '#'},
    {title: 'September 1999', url: '#'},
    {title: 'August 1999', url: '#'},
    {title: 'July 1999', url: '#'},
    {title: 'June 1999', url: '#'},
    {title: 'May 1999', url: '#'},
    {title: 'April 1999', url: '#'},
  ],
  social: [
    {name: 'GitHub', icon: GitHubIcon},
    {name: 'Twitter', icon: TwitterIcon},
    {name: 'Facebook', icon: FacebookIcon},
  ],
};

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
          <Router>
            <Container maxWidth="lg">
              <Header title="Social Hub" sections={sections}/>
              <Routes>
                <Route path="/" element={<Main sidebar={sidebar} posts={posts}/>}/>
                <Route path="/signup" element={<SignUp/>}/>
              </Routes>
            </Container>
          </Router>
          <Footer
            title="Footer"
            description="Something here to give the footer a purpose!"
          />
          <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
        <Message />
      </StoreProvider>
    </ThemeProvider>
  );
}