import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authrouter from "./routers/auth.routers.js";
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http'
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "./config.js";

async function aploloStart(typeDefs, resolvers) {
    const app = express();
    app.use("/api", authrouter);
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {

            const token = req.cookies.token;
            return { token };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        '/',
        cors({
            origin: "*",
            credentials: true,
        }),
        cookieParser(),
        express.json(),
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

    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

export default aploloStart;






