"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Firestore data:", docSnap.data()); // Logs the Firestore data
        const sets = docSnap.data().flashcardSets || [];
        setFlashcardSets(sets);
      } else {
        await setDoc(docRef, { flashcardSets: [] });
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcardSets();
    }
  }, [user, isLoaded, isSignedIn]);

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`);
  };

  return (
    <Container maxWidth="md" className="h-screen ">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(set.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {set.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            No flashcards saved yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
