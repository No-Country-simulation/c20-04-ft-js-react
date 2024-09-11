import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authrouter from "./routers/auth.routers.js";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "./config.js";

async function apolloStart(typeDefs, resolvers) {
    const app = express();

    // Configura CORS
    app.use(cors({
        origin: 'http://localhost:3000', // Permite solo el origen de tu frontend
        credentials: true // Permite el uso de credenciales (cookies, autenticación)
    }));

    // Middlewares
    app.use(cookieParser());
    app.use(express.json());

    // Rutas API
    app.use("/api", authrouter);

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    // Configuración de Apollo
    app.use(
        '/',
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                let user = null;
                const token = req.cookies.token;
                if (token) {
                    try {
                        user = jwt.verify(token, TOKEN_KEY);
                    } catch (err) {
                        console.error('Token verification failed:', err);
                    }
                }

                return { user, req, res };
            },
        }),
    );

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000/`);
};

export default apolloStart;
