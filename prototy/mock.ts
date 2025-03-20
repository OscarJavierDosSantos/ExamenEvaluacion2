// Este archivo contiene una lista inicial de productos de ejemplo.
// Estos datos se cargan en memoria al iniciar la API.

export const products = [
  {
    id: crypto.randomUUID(),
    name: "Laptop",
    price: 1200,
    stock: 10,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Phone",
    price: 800,
    stock: 20,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
