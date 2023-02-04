export type AmplifyDependentResourcesAttributes = {
  api: {
    osteophill: {
      GraphQLAPIEndpointOutput: "string";
      GraphQLAPIIdOutput: "string";
      GraphQLAPIKeyOutput: "string";
    };
  };
  auth: {
    osteophill: {
      AppClientID: "string";
      AppClientIDWeb: "string";
      IdentityPoolId: "string";
      IdentityPoolName: "string";
      UserPoolArn: "string";
      UserPoolId: "string";
      UserPoolName: "string";
    };
  };
  storage: {
    osteophill: {
      BucketName: "string";
      Region: "string";
    };
  };
};
