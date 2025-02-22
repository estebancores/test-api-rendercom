const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Simulación de base de datos
let properties = [
    { id: 1, name: "Casa en la playa", owner: "user1" },
    { id: 2, name: "Departamento en la ciudad", owner: "user2" }
];

// Obtener todas las propiedades
app.get('/properties', (req, res) => {
    res.json(properties);
});

// Obtener una propiedad por ID
app.get('/properties/:id', (req, res) => {
    const property = properties.find(p => p.id === parseInt(req.params.id));
    property ? res.json(property) : res.status(404).json({ message: "Propiedad no encontrada" });
});

// Agregar una nueva propiedad
app.post('/properties', (req, res) => {
    const newProperty = { id: properties.length + 1, ...req.body };
    properties.push(newProperty);
    res.status(201).json(newProperty);
});

// Eliminar una propiedad
app.delete('/properties/:id', (req, res) => {
    properties = properties.filter(p => p.id !== parseInt(req.params.id));
    res.json({ message: "Propiedad eliminada" });
});

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
