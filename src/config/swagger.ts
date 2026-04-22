import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "COMP-3018 Events API",
      version: "1.0.0",
      description: "Community Events + RSVPs backend API for COMP-3018.",
    },
    servers: [{ url: "http://127.0.0.1:3000" }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
});

