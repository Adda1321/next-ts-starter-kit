const config = {
  overwrite: true,
  schema: 'http://localhost:3000/api/v1/graphql',
  headers: {
    origin: '*',
  },
  documents: ['app/**/*.tsx', 'app/**/*.ts', 'src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
    // './graphql.schema.json': {
    //   plugins: ['introspection'],
    // },
  },
};

export default config;
