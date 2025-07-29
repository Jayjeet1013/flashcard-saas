"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
import Header from "../components/header";
import { useRouter } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const flashcardSetId = searchParams.get("id");

  useEffect(() => {
    async function getFlashcards() {
      if (!flashcardSetId || !user) {
        console.log("Flashcard set ID or user not defined.");
        return;
      }

      try {
        // Construct the reference to the specific flashcard set document
        const flashcardSetRef = doc(
          db,
          "users",
          user.id,
          "flashcardSets",
          flashcardSetId
        );

        // Fetch the document for the specific flashcard set
        const docSnap = await getDoc(flashcardSetRef);

        if (docSnap.exists()) {
          const flashcardSetData = docSnap.data();
          const flashcardsData = flashcardSetData.flashcards || [];

          setFlashcards(flashcardsData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcards();
    } else {
      console.log("User is not signed in or not loaded yet.");
    }
  }, [flashcardSetId, user, isLoaded, isSignedIn]);

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        paddingBottom: "100px",
        paddingTop: "80px", // Add top padding to avoid header overlap
        height: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* Title and Back Button Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 4, // Increased top margin
          mb: 3,
          px: 2, // Add horizontal padding
        }}
      >
        <Button
          onClick={() => router.push("/flashcards")}
          sx={{
            background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
            color: "white",
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(92, 132, 248, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          ← Back to Flashcards
        </Button>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textTransform: "uppercase",
            color: "white",
            textAlign: "center",
            flex: 1,
            mx: 3,
          }}
        >
          {flashcardSetId}
        </Typography>

        {/* Empty space for balance */}
        <Box sx={{ width: "200px" }} />
      </Box>

      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", mb: 4, mx: 2 }} />

      {/* Scrollable Cards Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "8px",
          px: 2, // Add horizontal padding to cards container
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(92, 132, 248, 0.5)",
            borderRadius: "4px",
            "&:hover": {
              background: "rgba(92, 132, 248, 0.7)",
            },
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress sx={{ color: "#5c84f8" }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {flashcards.length > 0 ? (
              flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                      border: "1px solid rgba(92, 132, 248, 0.2)",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(92, 132, 248, 0.3)",
                        border: "1px solid rgba(92, 132, 248, 0.4)",
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent sx={{ p: 0 }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "240px",
                            perspective: "1000px",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              transformStyle: "preserve-3d",
                              transition: "transform 0.6s",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                                color: "white",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 3,
                              }}
                            >
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ lineHeight: 1.4 }}
                              >
                                {flashcard.front || "Question not available"}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                  "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
                                color: "white",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 3,
                              }}
                            >
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ lineHeight: 1.4 }}
                              >
                                {flashcard.back || "Answer not available"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", mt: 8 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    No flashcards found.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
