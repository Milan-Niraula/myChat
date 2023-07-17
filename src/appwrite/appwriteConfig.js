import { Account, Client, Databases } from 'appwrite';

export const PROJECT_ID = '64aa4ae0ecaf2d84d8c6'
export const DATABASE_ID = '64aa4cae5116d47c41db'
export const COLLECTION_ID_MESSAGES = '64aa4cb49c2533879479'
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64aa4ae0ecaf2d84d8c6');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;