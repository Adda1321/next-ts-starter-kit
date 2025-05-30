import { mergeResolvers } from "@graphql-tools/merge";
 
import projectResolvers from "./project"
const baseResolvers = {
  Query: {
    version: () => "v1",
  },

};

export default mergeResolvers([baseResolvers, projectResolvers]);
