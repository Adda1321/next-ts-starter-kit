import { mergeResolvers } from "@graphql-tools/merge";

import userResolvers from "./user";

const baseResolvers = {
  Query: {
    version: () => "v1",
  },
};

export default mergeResolvers([baseResolvers, userResolvers]);
