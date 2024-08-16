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
import FeatureGrid from "./featuresGrid";
import { useRouter } from "next/navigation";
import PricingGrid from "./pricingGrid";

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
    <Container maxWidth="lg" sx={{ overflowY: "auto", pb: 10 }}>
      <Head>
        <title>Flashcard Saas</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Flashcard Saas
          </Typography>
          <SignedOut>
            <Button
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => router.push("sign-in")}
            >
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push("sign-up")}>
              Sign up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        gap={5}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", p: 5, pb: 0 }}>
          <Typography variant="h3">Welcome to Flashcard SaaS</Typography>
          <Typography sx={{ m: 3 }}>
            Revolutionize your learning experience with our innovative
            AI-curated interactive flashcards, designed to elevate your
            knowledge retention and engagement!
          </Typography>
          <Button variant="outlined" onClick={handleGetStartedClick}>
            Get Started
          </Button>
        </Box>
        <Divider />
        <FeatureGrid />
        <PricingGrid />
      </Box>
    </Container>
  );
}
