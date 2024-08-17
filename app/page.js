"use client";

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton,useUser } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import Head from "next/head";
import FeatureGrid from "./components/featuresGrid";
import { useRouter } from "next/navigation";
import PricingGrid from "./components/pricingGrid";
import FaqSection from "./components/faqSection";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Use Clerk's hook to check if the user is signed in

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      router.push("/generate"); // Redirect to Generate page if signed in
    } else {
      router.push("/sign-up"); // Redirect to Sign-up page if not signed in
    }
  };
  return (
    <Container 
      maxWidth="100%" 
      sx={{ 
        overflowY: "auto", 
        pb: 10,
        // backgroundImage: "linear-gradient(to top,rgb(58, 58, 58), rgb(30, 30, 30))",
      }}
    >
      <Head>
        <title>Flashcard Saas</title>
      </Head>
      <AppBar 
        sx={{ 
          backgroundColor: "rgb(30 30 30)" 
        }}
      >
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Flashcard Saas
          </Typography>
          <SignedOut>
            <Button
              color="primary"
              variant="contained"
              sx={{ 
                mr: 2,
                borderRadius: 8,
              }}
              onClick={() => router.push("sign-in")}
            >
              Login
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              onClick={() => router.push("sign-up")}
              sx={{
                borderRadius: 8,
              }}
            >
              Sign up
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push("/flashcards")}
              sx={{
                borderRadius: 8,
                mr: 2,
              }}
            >
              Your flashcards
            </Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box
          gap={5}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: 10
          }}
        >
          <Box sx={{ textAlign: "center", p: 5, pb: 0 }}>
            <Typography variant="h3" color={"white"} fontWeight="700">Welcome to Flashcard SaaS</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ m: 3, color: "white" }}>
              Revolutionize your learning experience with our innovative
              AI-curated interactive flashcards, designed to elevate your
              knowledge retention and engagement!
            </Typography>
            <Button variant="contained" sx={{ borderRadius: 5 }} onClick={handleGetStartedClick}>
              Get Started
            </Button>
          </Box>
          <Divider color="white"/>
          <FeatureGrid />
          <Divider color="white" />
          <PricingGrid />
          <Divider color="white" />
          <FaqSection />
        </Box>
      </Container>
    </Container>
  );
}
