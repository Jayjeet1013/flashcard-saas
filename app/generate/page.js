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
} from "@mui/material";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Generate() {
  const { user } = useUser(); // Use the useUser hook to get user information
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [textFieldError, setTextFieldError] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

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
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

 const handleSubmit = async () => {

  setTextFieldError(false);

   if (!text.trim()) {
     alert("Please enter some text to generate flashcards.");
     setTextFieldError(true);
     return;
   }

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
     console.log("Generated flashcards:", data); // Add this line

     if (data.flashcards) {
       setFlashcards(data.flashcards);
       setText("");
     } else {
       console.error("Unexpected response format:", data);
       alert("An error occurred. Please try again.");
     }
   } catch (error) {
     console.error("Error generating flashcards:", error);
     alert("An error occurred while generating flashcards. Please try again.");
   }
 };


  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <Container maxWidth="100%" sx={{ backgroundImage: "linear-gradient(to top,rgb(58, 58, 58), rgb(30, 30, 30))", height: "100vh", overflowY: 'auto' }}>
      <Container maxWidth="md" sx={{ p: 5 }}>
        <Box sx={{ color: "white", display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Generate Flashcards
          </Typography>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter text"
              fullWidth
              multiline
              required
              rows={4}
              variant="outlined"
              sx={{ 
                mb: 2, 
                color: "white",
                "& .MuiInputLabel-root": {color: 'white'}, 
                "& .MuiInputLabel-root.Mui-focused": {color: !textFieldError ? "rgb(21, 101, 192)" : "red"},
                "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "white" }},
                "&:hover .MuiOutlinedInput-root": { "& > fieldset": { borderColor: !textFieldError ? "rgb(21, 101, 192)": "red" }},
              }}
              error={textFieldError}
              inputProps={{
                style: { 
                  color: "white",
                },
              }}
            />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" color="white" sx={{ mb: 3 }}>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    className="card-container"
                    onClick={() => handleCardClick(index)}
                  >
                    <div
                      className={`card ${
                        flippedIndex === index ? "flipped" : ""
                      }`}
                    >
                      <div className="card-face card-front">
                        <CardContent>
                          {/* <Typography variant="h6">Front:</Typography> */}
                          <Typography variant="h6">{flashcard.front}</Typography>
                        </CardContent>
                      </div>
                      <div className="card-face card-back">
                        <CardContent>
                          {/* <Typography variant="h6">Back:</Typography> */}
                          <Typography variant="h6">{flashcard.back}</Typography>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Save Flashcards
            </Button>
          </Box>
        )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Save Flashcard Set</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Container>
  );
}
