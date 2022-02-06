export const parseGQLErrors = (err: any) => {
    let message: string = "An error occurred";
  
    if (typeof err === "object") {
      if (Object.keys(err).length > 0) {
        if (err?.graphQLErrors?.length > 0) {
          message = err?.graphQLErrors[0]?.message;
        }
      }
    } else {
      message = err;
    }
  
   return message;
  }

  export function pxToRem(number: number, baseNumber = 16) {
    return `${number / baseNumber}rem`;
  }
  
  export default pxToRem;
  
  export function sanitizeJWT(token: any) {
    if (typeof token === "string") {
      return token;
    }
    const cleanToken = { ...token };
    try {
      delete cleanToken?.iss;
      delete cleanToken?.sub;
      delete cleanToken?.aud;
      delete cleanToken?.exp;
      delete cleanToken?.nbf;
      delete cleanToken?.iat;
      delete cleanToken?.jti;
      return cleanToken;
    } catch (err) {
      throw new Error("Error cleaning token...");
    }
  }