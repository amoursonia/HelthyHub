const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const initDB = require('./config/dbInit'); // <--- import

app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require('./routes/auth');
const recettesRoutes = require('./routes/recettes');

app.use('/api/auth', authRoutes);
app.use('/api/recettes', recettesRoutes);

// ✅ Initialisation DB
initDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur backend sur http://localhost:${PORT}`));
