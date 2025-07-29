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
import {
  ArrowForward,
  AutoAwesome,
  Speed,
  Security,
} from "@mui/icons-material";

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
        pb: 0,
        pt: 0,
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)",
        color: "white",
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at center, rgba(92, 132, 248, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: { xs: 8, sm: 10, md: 12 },
          }}
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 6, sm: 8, md: 10 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.5rem",
                    md: "4.5rem",
                    lg: "5rem",
                  },
                  background:
                    "linear-gradient(135deg, #5c84f8 0%, #4f46e5 50%, #7c3aed 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  textShadow: "0 0 30px rgba(92, 132, 248, 0.3)",
                  lineHeight: 1.1,
                }}
              >
                FlashLoom
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.5rem",
                    md: "1.8rem",
                    lg: "2rem",
                  },
                  color: "rgba(255, 255, 255, 0.9)",
                  mb: 4,
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.4,
                }}
              >
                Revolutionize your learning with AI-powered interactive
                flashcards designed for maximum knowledge retention
              </Typography>

              {/* Feature highlights */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 3,
                  mb: 6,
                }}
              >
                {[
                  { icon: <AutoAwesome />, text: "AI-Powered" },
                  { icon: <Speed />, text: "Instant Generation" },
                  { icon: <Security />, text: "Secure & Private" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        background: "rgba(92, 132, 248, 0.1)",
                        border: "1px solid rgba(92, 132, 248, 0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Box sx={{ color: "#5c84f8", fontSize: 20 }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleGetStartedClick}
                  sx={{
                    borderRadius: 4,
                    px: 4,
                    py: 2,
                    background:
                      "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                    boxShadow: "0 10px 30px rgba(92, 132, 248, 0.4)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                      boxShadow: "0 15px 40px rgba(92, 132, 248, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Get Started Free
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Elegant Section Dividers */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: { xs: 6, sm: 8 },
              "&::before, &::after": {
                content: '""',
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(92, 132, 248, 0.3), transparent)",
              },
            }}
          >
            <Box
              sx={{
                mx: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                boxShadow: "0 0 20px rgba(92, 132, 248, 0.5)",
              }}
            />
          </Box>

          <FeatureGrid />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: { xs: 6, sm: 8 },
              "&::before, &::after": {
                content: '""',
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(92, 132, 248, 0.3), transparent)",
              },
            }}
          >
            <Box
              sx={{
                mx: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                boxShadow: "0 0 20px rgba(92, 132, 248, 0.5)",
              }}
            />
          </Box>

          <PricingGrid />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: { xs: 6, sm: 8 },
              "&::before, &::after": {
                content: '""',
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(92, 132, 248, 0.3), transparent)",
              },
            }}
          >
            <Box
              sx={{
                mx: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                boxShadow: "0 0 20px rgba(92, 132, 248, 0.5)",
              }}
            />
          </Box>

          <FaqSection />
        </Box>
      </Container>
    </Container>
  );
}
