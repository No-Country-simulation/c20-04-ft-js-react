import aploloStart from "./app.js"
import { conecDB } from "./db.js"
import resolvers from "./graphql/resolvers/index.js";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { context } from "./context.js";

const typeDefs = loadSchemaSync("./graphql/typeDefs.graphql",{
    loaders: [new GraphQLFileLoader()],
});

conecDB();
aploloStart(typeDefs, resolvers);