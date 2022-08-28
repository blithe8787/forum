import { buildSchema } from "type-graphql";
import { ChannelResolver } from "../resolvers/channel-resolver";
import { MessageResolver } from "../resolvers/message-resolver";

export const createSchema = () =>
    buildSchema({
        resolvers: [
            ChannelResolver,
            MessageResolver
        ]
    });

