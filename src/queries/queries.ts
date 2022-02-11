import gql from "graphql-tag";

export const GET_USERS = gql`
  query users {
    users {
      id
    }
  }
`;

export const REGISTER_USER = gql`

  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $countryCode: String!
    $countryName: String!
    $province: String!
    $ipAddress: String!
    $phoneNumber: String!
    $password: String!
    $termsAgreed: Boolean!
  ) {
    registerUser(
      input: {
        email: $email 
        province: $province
        password: $password
        lastName: $lastName
        firstName: $firstName
        ipAddress: $ipAddress
        termsAgreed:$termsAgreed,
        countryCode: $countryCode
        countryName: $countryName
        phoneNumber: $phoneNumber
      }
    ) {
      token
    }
  }
`;

export const AUTHETICATE_USER = gql`
  mutation AuthenticateUser(
    $email: String!
    $password: String!
    $ipAddress: String!
  ) {
    authenticateUser(
      input: { email: $email, password: $password, ipAddress: $ipAddress }
    ) {
      token
    }
  }
`;

export const SEND_VERIFICATION_CODE = gql`
  mutation SendVerificationCode(
    $email: String!
    $phoneNumber: String!
    $verficationType: String!
  ) {
    sendVerificationCode(
      input: {
        email: $email
        phoneNumber: $phoneNumber
        verficationType: $verficationType
      }
    ) {
      success
    }
  }
`;

export const VERIFY_CODE = gql`
  mutation VerifyCode($email: String!, $code: String!) {
    verifyCode(input: { email: $email, code: $code }) {
      verified
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    resetPassword(
      input: {
        email: $email
        oldPassword: $oldPassword
        newPassword: $newPassword
      }
    ) {
      success
    }
  }
`;

export const FETCH_ASSETS = gql`
  query FetchAssets($start: Int!, $limit: Int!, $conversion: String!) {
    assets(
      arguments: { start: $start, limit: $limit, conversion: $conversion }
    ) {
      id
      name
      price
      symbol
      marketCap
      numMarketPairs
      percentChange1h
    }
  }
`;

export const CREATE_WALLET = gql`
  mutation CreateWallet($uid: String!) {
    createWallet(arguments: { uid: $uid }) {
      wallet {
        balance
        publicKey
        walletAddress
      }
    }
  }
`;

export const GET_USER_WALLET = gql`
  query GetUserWallet($uid: String!) {
    getUserWallet(arguments: { uid: $uid }) {
      balance
      publicKey
      walletAddress
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query GetUserPaymentMethods($uid: String!) {
    getUserPaymentMethods(arguments: { uid: $uid }) {
      uid
      cvc
      cardNumber
      cardHolderName
      expiryDate
      city
      issuer
      country
      address
      province
      postalCode
    }
  }
`;

export const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod(
    $uid: String!
    $issuer: String!
    $cvc: String!
    $cardNumber: String!
    $expiryDate: String!
    $cardHolderName: String!
    $address: String!
    $province: String!
    $postalCode: String!
    $city: String!
    $country: String!
  ) {
    createPaymentMethod(
      arguments: {
        uid: $uid
        cvc: $cvc
        issuer: $issuer
        cardNumber: $cardNumber
        expiryDate: $expiryDate
        cardHolderName: $cardHolderName
        address: $address
        province: $province
        postalCode: $postalCode
        city: $city
        country: $country
      }
    ) {
      success
    }
  }
`;
