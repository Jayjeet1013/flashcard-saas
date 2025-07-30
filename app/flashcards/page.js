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
  IconButton,
  Fade,
  Chip,
} from "@mui/material";
import {
  AddCircle,
  Delete,
  Collections,
  AutoAwesome,
  TrendingUp,
} from "@mui/icons-material";
import { doc, collection, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
import Header from "../components/header";
import { motion, AnimatePresence } from "framer-motion";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingIndex, setDeletingIndex] = useState(null);
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
        setLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcardSets();
    }
  }, [user, isLoaded, isSignedIn]);

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`);
  };

  const handleDeleteClick = async (index) => {
    setDeletingIndex(index);

    setTimeout(async () => {
      const updatedFlashcardSets = flashcardSets.filter((_, i) => i !== index);

      setFlashcardSets(updatedFlashcardSets);
      setDeletingIndex(null);

      const docRef = doc(collection(db, "users"), user.id);
      await updateDoc(docRef, { flashcardSets: updatedFlashcardSets });
    }, 300);
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)",
        minHeight: "100vh",
        overflowY: "auto",
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
      <Container
        maxWidth="lg"
        sx={{
          p: { xs: 2, sm: 4, md: 5 },
          mt: { xs: 8, sm: 10, md: 12 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                background:
                  "linear-gradient(135deg, #5c84f8 0%, #4f46e5 50%, #7c3aed 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Your Flashcards
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Manage and study your AI-generated flashcard collections
            </Typography>

            {flashcardSets.length > 0 && (
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={<Collections />}
                  label={`${flashcardSets.length} Sets`}
                  sx={{
                    background: "rgba(92, 132, 248, 0.1)",
                    border: "1px solid rgba(92, 132, 248, 0.2)",
                    color: "#5c84f8",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<TrendingUp />}
                  label="Study Progress"
                  sx={{
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    color: "#22c55e",
                    fontWeight: 600,
                  }}
                />
              </Box>
            )}
          </Box>
        </motion.div>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              gap: 3,
            }}
          >
            <CircularProgress
              size={60}
              sx={{
                color: "#5c84f8",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Loading your flashcards...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <AnimatePresence>
              {flashcardSets.length > 0 ? (
                flashcardSets.map((set, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      layout
                    >
                      <Fade in={deletingIndex !== index} timeout={300}>
                        <Card
                          sx={{
                            position: "relative",
                            minHeight: 200,
                            background:
                              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                            border: "1px solid rgba(92, 132, 248, 0.2)",
                            borderRadius: 4,
                            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              border: "1px solid rgba(92, 132, 248, 0.4)",
                              boxShadow: "0 25px 50px rgba(92, 132, 248, 0.15)",
                              transform: "translateY(-8px)",
                            },
                          }}
                        >
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              zIndex: 2,
                              background: "rgba(244, 67, 54, 0.1)",
                              border: "1px solid rgba(244, 67, 54, 0.2)",
                              color: "#f44336",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: "rgba(244, 67, 54, 0.2)",
                                border: "1px solid rgba(244, 67, 54, 0.4)",
                                transform: "scale(1.1)",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(index);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>

                          <CardActionArea
                            sx={{
                              width: "100%",
                              minHeight: 200,
                              p: 3,
                            }}
                            onClick={() => handleCardClick(set.name)}
                          >
                            <CardContent
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                height: "100%",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                                  boxShadow:
                                    "0 10px 30px rgba(92, 132, 248, 0.4)",
                                  mb: 1,
                                }}
                              >
                                <Collections
                                  sx={{ color: "white", fontSize: 28 }}
                                />
                              </Box>

                              <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                  color: "white",
                                  fontWeight: 600,
                                  lineHeight: 1.3,
                                  wordBreak: "break-word",
                                }}
                              >
                                {set.name}
                              </Typography>

                              <Typography
                                variant="body2"
                                sx={{
                                  color: "rgba(255, 255, 255, 0.6)",
                                  fontSize: "0.875rem",
                                }}
                              >
                                Click to study
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Fade>
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        px: 4,
                        background:
                          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                        border: "1px solid rgba(92, 132, 248, 0.2)",
                        borderRadius: 4,
                        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <AutoAwesome
                        sx={{
                          fontSize: 80,
                          color: "rgba(92, 132, 248, 0.5)",
                          mb: 3,
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        No flashcards yet
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          mb: 4,
                          maxWidth: 400,
                          mx: "auto",
                        }}
                      >
                        Create your first set of AI-generated flashcards to
                        start learning efficiently
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              )}
            </AnimatePresence>

            {/* Create New Set Card */}
            <Grid item xs={12} sm={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: flashcardSets.length * 0.1 + 0.2,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    minHeight: 200,
                    background:
                      "linear-gradient(135deg, rgba(92, 132, 248, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)",
                    border: "2px dashed rgba(92, 132, 248, 0.3)",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "2px dashed rgba(92, 132, 248, 0.6)",
                      background:
                        "linear-gradient(135deg, rgba(92, 132, 248, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)",
                      transform: "translateY(-8px) scale(1.02)",
                    },
                  }}
                >
                  <CardActionArea
                    sx={{
                      width: "100%",
                      minHeight: 200,
                      p: 3,
                    }}
                    onClick={() => router.push("/generate")}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "100%",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                          boxShadow: "0 10px 30px rgba(92, 132, 248, 0.4)",
                          mb: 1,
                        }}
                      >
                        <AddCircle sx={{ color: "white", fontSize: 28 }} />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          color: "#5c84f8",
                          fontWeight: 600,
                        }}
                      >
                        Create New Set
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(92, 132, 248, 0.8)",
                          fontSize: "0.875rem",
                        }}
                      >
                        Generate with AI
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        )}
      </Container>
    </Container>
  );
}
