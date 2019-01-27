import Amplify, { Auth } from "aws-amplify";

const CognitoConfig = {
  Auth: {
    identityPoolId: "ap-southeast-2_vvuIKjIal",
    region: "",
    userPoolId: "ap-southeast-2_vvuIKjIal",
    userPoolWebClientId: ""
  }
};

Amplify.configure(CognitoConfig);
