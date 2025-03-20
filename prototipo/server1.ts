// Importación de módulos necesarios.
import express from "express"; // Framework Express.js para construir la API REST.
import { products } from "./mock.js"; // Importar el mock de nuestros items de prueba.
import crypto from "crypto"; // Importar el módulo crypto para generar UUIDs.
const MESSAGE = "Product not found";

// Crear una instancia de la aplicación Express.
const app = express();

// Middleware para parsear solicitudes en formato JSON.
app.use(express.json());

// Método GET para obtener la lista de todos items.
app.get("/products", (req, res) => {
  // Respuesta con la lista completa de items.
  res.json(products);
});

// Método GET para obtener un item específico por su id.
app.get("/products/:id", (req, res) => {
  // Obtener el id de los parámetros de la ruta (URL).
  const { id } = req.params;
  // Buscar el item por id en el mock o en memoria.
  const product = products.find((p) => p.id === id);
  if (product) {
    // Si se encuentra, devolver el item.
    res.json(product);
  } else {
    // Si no, devolver error 404 con un texto indicando que no encuentra el item buscado.
    res.status(404).json({ message: MESSAGE });
  }
});

// Método POST para crear un nuevo item.
app.post("/products", (req, res) => {
  // Extraer datos del cuerpo de la solicitud para la creación del item.
  const { name, price, stock, is_active } = req.body;
  // Atributos para la creación del nuevo item
  const newProduct = {
    id: crypto.randomUUID(), // Generar un UUID único para el nuevo producto.
    name,
    price,
    stock,
    is_active,
    created_at: new Date(),
    updated_at: new Date(),
  };
  // Agregar el nuevo item a la lista.
  products.push(newProduct);
  // Devolvemos en la respuesta el item creado.
  res.status(201).json(newProduct);
});

// Método PATCH para actualizar un item existente por su id.
app.patch("/products/:id", (req, res) => {
  // Obtener el id de los parámetros de la ruta (URL).
  const { id } = req.params;
  // Buscamos el item por el id que obtuvimos anteriormente.
  const product = products.find((p) => p.id === id);

  if (product) {
    // Actualizamos solo los campos proporcionados en el cuerpo de la solicitud.
    Object.assign(product, req.body, { updated_at: new Date() });
    // Devolvemos en la respuesta el item actualizado.
    res.json(product);
  } else {
    // Si no, devolver error 404 con un texto indicando que no encuentra el item buscado para la actualización.
    res.status(404).json({ message: MESSAGE });
  }
});

// Método DELETE para eliminar un item por su id.
app.delete("/products/:id", (req, res) => {
  // Obtener el id de los parámetros de la ruta (URL).
  const { id } = req.params;
  // Buscamos el item por el id que obtuvimos anteriormente.
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    // Eliminar el item de la memoria.
    products.splice(index, 1);
    // Devolver una respuesta vacía con estado 204.
    res.status(204).send();
  } else {
    // Si no, devolver error 404 con un texto indicando que no encuentra el item buscado para el borrado.
    res.status(404).json({ message: MESSAGE });
  }
});

// Inicio el servidor en el puerto 3000(Puede cambiar el puerto).
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
