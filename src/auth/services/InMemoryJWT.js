// import { AuthClient } from "../stores/AuthContext.js";

// const inMemoryJWTService = () => {
//   let inMemoryJWT = null;
//   let refreshTimeoutId;

//   const refreshToken = (expiration) => {
//     const timeoutTrigger = expiration - 10000;

//     refreshTimeoutId = setTimeout(() => {
//       AuthClient.post("/refresh")
//         .then((res) => {
//           const { accessToken, accessTokenExpiration } = res.data;
//           setToken(accessToken, accessTokenExpiration);
//         })
//         .catch(console.error);
//     }, timeoutTrigger);
//   };

//   const abortRefreshToken = () => {
//     if (refreshTimeoutId) {
//       clearInterval(refreshTimeoutId);
//     }
//   };

//   const getToken = () => inMemoryJWT;

//   const setToken = (token, tokenExpiration) => {
//     inMemoryJWT = token;
//     refreshToken(tokenExpiration);
//   };

//   const deleteToken = () => {
//     inMemoryJWT = null;
//     abortRefreshToken();
//   };

//   return { getToken, setToken, deleteToken };
// };

// export default inMemoryJWTService();
