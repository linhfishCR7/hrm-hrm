import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'ap-southeast-1_8Floj89lt',
  ClientId: '3tg4c27ft0da820h919g1p3943',
}

export default new CognitoUserPool(poolData)
