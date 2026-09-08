import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { connectDB } from "./db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function start() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set in environment");
    process.exit(1);
  }

  await connectDB(process.env.MONGO_URI as string);

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Server ready at ${url}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
