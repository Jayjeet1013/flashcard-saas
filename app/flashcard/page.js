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
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
import Header from "../components/header";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [loading, setLoading] = useState(true);

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
    <Container maxWidth="md" sx={{ height: "100vh", overflowY: "auto" }}>
      <Header />
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 15 }}>
        {flashcardSetId}
      </Typography>
      <Divider color="white" sx={{ mt: 3 }} />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {flashcards.length > 0 ? (
            flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "150px",
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
                              backgroundColor: "#fff",
                              border: "1px solid #ddd",
                            }}
                          >
                            <Typography variant="h5" component="div">
                              {flashcard.front || "Front not available"}
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
                              backgroundColor: "#f0f0f0",
                              border: "1px solid #ddd",
                            }}
                          >
                            <Typography variant="h5" component="div">
                              {flashcard.back || "Back not available"}
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
            <Typography variant="h6" sx={{ mt: 4 }}>
              No flashcards found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}
