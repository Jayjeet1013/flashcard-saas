"use client";

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
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
import Header from "./components/header";
import { motion } from "framer-motion";

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
        pt: 6,
        backgroundColor: "#121212", // Dark background for the entire page
        color: "white", // Default text color
      }}
    >
      <Header />
      <Container maxWidth="lg">
        <Box
          gap={5}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="700">
              Welcome to FlashLoom
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ m: 3 }}>
              Revolutionize your learning experience with our innovative
              AI-curated interactive flashcards, designed to elevate your
              knowledge retention and engagement!
            </Typography>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: "center" }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 5,
                backgroundColor: "#5c84f8",
                "&:hover": {
                  backgroundColor: "#4a6abf",
                },
              }}
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </motion.div>
          <Divider sx={{ borderColor: "white" }} />
          <FeatureGrid />
          <Divider sx={{ borderColor: "white" }} />
          <PricingGrid />
          <Divider sx={{ borderColor: "white" }} />
          <FaqSection />
        </Box>
      </Container>
    </Container>
  );
}
