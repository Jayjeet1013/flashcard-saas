"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { motion } from "framer-motion";

export default function Generate() {
  const { user } = useUser();
  const router = useRouter();
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [textFieldError, setTextFieldError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const checkSubscriptionStatus = async (userId) => {
    try {
      // Fetch the user's document from the "users" collection
      const userDocRef = doc(db, "users", userId); // Reference to the user document
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error("User not found in the database.");
      }

      const userData = userDocSnap.data();
      const customerId = userData.stripeCustomerId; // Assuming you stored the Stripe customer ID directly

      // Call backend to check the subscription status
      const response = await fetch(
        `/api/check-subscription?customerId=${customerId}`
      );
      const data = await response.json();

      return data.isSubscribed; // Return subscription status
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false; // Default to false if there's an error
    }
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      router.push(`/flashcards`);
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setTextFieldError(false);
    setIsGenerating(true);

    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      setTextFieldError(true);
      setIsGenerating(false);
      return;
    }
    //  const isSubscribed = await checkSubscriptionStatus(user.id);
    //  if (!isSubscribed) {
    //   alert("You need an active subscription to generate flashcards.");
    //   setIsGenerating(false);
    //   return; // Prevent further execution
    // }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ message: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log("Generated flashcards:", data);

      if (data.flashcards) {
        setFlashcards(data.flashcards);
        setText("");
      } else {
        console.error("Unexpected response format:", data);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
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
          <Box sx={{ color: "white", mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                background:
                  "linear-gradient(135deg, #5c84f8 0%, #4f46e5 50%, #7c3aed 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                textAlign: "center",
              }}
            >
              Generate Flashcards
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Transform your study material into interactive flashcards with AI
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              p: 4,
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              border: "1px solid rgba(92, 132, 248, 0.2)",
              borderRadius: 4,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              mb: 4,
            }}
          >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your study material, notes, or any text you want to convert into flashcards..."
              fullWidth
              multiline
              required
              rows={6}
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: !textFieldError ? "#5c84f8" : "#f44336",
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "rgba(92, 132, 248, 0.3)",
                    borderWidth: 2,
                  },
                  "&:hover > fieldset": {
                    borderColor: !textFieldError ? "#5c84f8" : "#f44336",
                  },
                  "&.Mui-focused > fieldset": {
                    borderColor: !textFieldError ? "#5c84f8" : "#f44336",
                  },
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: 3,
                },
              }}
              error={textFieldError}
              inputProps={{
                style: {
                  color: "white",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                },
              }}
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                fullWidth
                disabled={isGenerating}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  background: isGenerating
                    ? "linear-gradient(135deg, #666 0%, #555 100%)"
                    : "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: isGenerating
                    ? "0 5px 15px rgba(0, 0, 0, 0.2)"
                    : "0 10px 30px rgba(92, 132, 248, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: isGenerating
                      ? "linear-gradient(135deg, #666 0%, #555 100%)"
                      : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: isGenerating
                      ? "0 5px 15px rgba(0, 0, 0, 0.2)"
                      : "0 15px 40px rgba(92, 132, 248, 0.6)",
                  },
                  "&.Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              >
                {isGenerating
                  ? "Generating your flashcards..."
                  : "Generate Flashcards with AI ✨"}
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {flashcards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Your Flashcards
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                Click on any card to flip it and see the answer
              </Typography>

              <Box
                sx={{
                  width: 80,
                  height: 4,
                  background:
                    "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                  borderRadius: 2,
                  mx: "auto",
                  mb: 4,
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card
                    onClick={() => handleCardClick(index)}
                    sx={{
                      height: 250,
                      cursor: "pointer",
                      background:
                        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                      border: "1px solid rgba(92, 132, 248, 0.2)",
                      borderRadius: 3,
                      position: "relative",
                      perspective: "1000px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(92, 132, 248, 0.3)",
                        border: "1px solid rgba(92, 132, 248, 0.4)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s",
                        transform:
                          flippedIndex === index
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                      }}
                    >
                      {/* Front Side */}
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
                          borderRadius: 3,
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            textAlign: "center",
                            lineHeight: 1.4,
                            fontWeight: 500,
                          }}
                        >
                          {flashcard.front}
                        </Typography>
                      </Box>

                      {/* Back Side */}
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
                          borderRadius: 3,
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            textAlign: "center",
                            lineHeight: 1.4,
                            fontWeight: 500,
                          }}
                        >
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}

        {flashcards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpenDialog}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    boxShadow: "0 15px 40px rgba(34, 197, 94, 0.6)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Save Flashcard Set 💾
              </Button>
            </Box>
          </motion.div>
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              border: "1px solid rgba(92, 132, 248, 0.2)",
              borderRadius: 3,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <DialogTitle sx={{ color: "white", fontWeight: 600 }}>
            Save Flashcard Set
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}
            >
              Give your flashcard set a memorable name to easily find it later.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#5c84f8" },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "rgba(92, 132, 248, 0.3)",
                  },
                  "&:hover > fieldset": {
                    borderColor: "#5c84f8",
                  },
                  "&.Mui-focused > fieldset": {
                    borderColor: "#5c84f8",
                  },
                  background: "rgba(0, 0, 0, 0.2)",
                },
              }}
              inputProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveFlashcards}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Container>
  );
}
