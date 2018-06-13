import { Auth } from "aws-amplify/lib/index";
import AWSAppSyncClient from "aws-appsync";
import AppSync from "../constants/AppSync";

export const apolloClient = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,

    jwtToken: async () => {
      try {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
      } catch (e) {
        return null;
      }
    }
  }
});
