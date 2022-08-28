import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import { useContainer, createConnection } from "typeorm";
import { buildSchema } from "type-graphql";


import { ChannelResolver } from "./resolvers/channel-resolver";
import { MessageResolver } from "./resolvers/message-resolver";

import { seedDatabase } from "./helpers"


// register 3rd party IOC container
useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await createConnection();

    // seed database with some data
    await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [ChannelResolver, MessageResolver],
      container: Container,
    });

    // create mocked context
    // const context: Context = {  };

    // Create GraphQL server
    const server = new ApolloServer({ schema });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}graphql`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
