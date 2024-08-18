"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Header from "../components/header";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        
        const sets = docSnap.data().flashcardSets || [];
        setFlashcardSets(sets);
        setLoading(false);
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
    <Container maxWidth="md" sx={{ height: "100vh", p: 5, overflowY: 'auto' }}>
      <Header />
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 10 }}>Your Flashcards</Typography>
      <Divider color="white" sx={{ mt: 3 }} />
      {
        loading 
        ? 
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80%" }}>
          <CircularProgress />
        </Box> 
        :
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {flashcardSets.length > 0 ? (
            flashcardSets.map((set, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ minHeight: 200 }}>
                  <CardActionArea sx={{ width: "100%", minHeight: 200 }} onClick={() => handleCardClick(set.name)}>
                    <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography variant="h6" component="div">
                        {set.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <div></div>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ minHeight: 200 }}>
              <CardActionArea sx={{ width: "100%", minHeight: 200 }} onClick={() => router.push("/generate")}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6">
                    Click here to create one!
                  </Typography>
                  <AddCircleIcon />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      }
    </Container>
  );
}
