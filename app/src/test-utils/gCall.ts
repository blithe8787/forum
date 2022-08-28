import { graphql, GraphQLSchema, execute } from "graphql";
import { Maybe } from 'graphql/jsutils/Maybe';

import { createSchema } from "./createSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql(schema, source, null, null, variableValues);
};
