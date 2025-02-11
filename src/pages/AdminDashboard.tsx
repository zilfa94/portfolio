import { Box, Container, Typography, Paper, Grid, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const cloudinaryConfig = {
  cloud_name: 'dru9rthjv',
  upload_preset: 'robots_kids',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Charger les tutoriels existants
  useEffect(() => {
    const fetchTutorials = async () => {
      const querySnapshot = await getDocs(collection(db, 'tutorials'));
      const tutorialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTutorials(tutorialsData);
    };
    fetchTutorials();
  }, []);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrl = image ? await handleImageUpload(image) : '';
      if (editId) {
        const tutorialDoc = doc(db, 'tutorials', editId);
        await updateDoc(tutorialDoc, { title, text, imageUrl });
        setEditId(null);
      } else {
        await addDoc(collection(db, 'tutorials'), { title, text, imageUrl });
      }
      setTitle('');
      setText('');
      setImage(null);
      const querySnapshot = await getDocs(collection(db, 'tutorials'));
      const tutorialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTutorials(tutorialsData);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du tutoriel :', error);
    }
  };

  const handleEdit = (tutorial: any) => {
    setTitle(tutorial.title);
    setText(tutorial.text);
    setImage(null);
    setEditId(tutorial.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tutorials', id));
      setTutorials(tutorials.filter(tutorial => tutorial.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du tutoriel :', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord administrateur
      </Typography>
      <Grid container spacing={3}>
        {/* Formulaire de création de tutoriel */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {editId ? 'Modifier le tutoriel' : 'Créer un nouveau tutoriel'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Titre"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Texte"
                fullWidth
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}>
                Télécharger une image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editId ? 'Modifier' : 'Créer'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* Liste des tutoriels */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Liste des tutoriels
            </Typography>
            <List>
              {tutorials.map((tutorial) => (
                <ListItem key={tutorial.id} secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(tutorial)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tutorial.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                  <ListItemText
                    primary={tutorial.title}
                    secondary={tutorial.text}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;