import path from 'path';
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeTypeDefs} from '@graphql-tools/merge';

const filePaths = path.join(process.cwd(), './graphql/v1/types/**/*.graphql');
const typesArray = loadFilesSync(filePaths);

export default mergeTypeDefs(typesArray);
