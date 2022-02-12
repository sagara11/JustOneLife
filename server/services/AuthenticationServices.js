const ethUtil = require("ethereumjs-util");
const sigUtil = require("@metamask/eth-sig-util");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {isEmpty} = require("lodash");

const authenticationServices = {
  verifyUser: async (publicAddress) => {
    ////////////////////////////////////////////////////
    // Step 1: Verify user
    ////////////////////////////////////////////////////
    const user = await User.findByAddress(publicAddress);
    return user ? user : null;
  },

  verifyDigitalSignature: async (user, publicAddress, signature) => {
    ////////////////////////////////////////////////////
    // Step 2: Verify digital signature
    ////////////////////////////////////////////////////
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      return null;
    }
    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, "utf8"));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      signature: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    return address.toLowerCase() === publicAddress.toLowerCase() ? user : null;
  },

  generateNewNonce: (user) => {
    ////////////////////////////////////////////////////
    // Step 3: Generate a new nonce for the user
    ////////////////////////////////////////////////////
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      return null;
    }

    user.nonce = Math.floor(Math.random() * 10000);
    return user.save();
  },

  createJWT: async (user, publicAddress) => {
    ////////////////////////////////////////////////////
    // Step 4: Create JWT
    ////////////////////////////////////////////////////
    const accessToken = await jwt.sign(
      {
        id: user.id,
        publicAddress: publicAddress,
      },
      process.env.SECRET_KEY,
      {expiresIn: process.env.TIME_EXPIRES_JWT}
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        publicAddress: publicAddress,
      },
      process.env.REFRESH_TOKEN_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();
    return accessToken ? accessToken : null;
  },

  refreshTokenHandle: async (refreshToken) => {
    if (!refreshToken) return null;
    const refreshTokenExists = await User.findOne({
      refreshToken: refreshToken,
    }).exec();

    if (isEmpty(refreshTokenExists)) return null;

    const accessTokenValid = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (isEmpty(accessTokenValid)) {
      return null;
    }
    const accessToken = await jwt.sign(
      {
        id: accessTokenValid.id,
        publicAddress: accessTokenValid.publicAddress,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.TIME_EXPIRES_JWT,
      }
    );
    return accessToken ? accessToken : null;
  },

  authenticateUser: async (publicAddress, signature) => {
    let error,
      accessToken = null;
    const user = await authenticationServices.verifyUser(publicAddress);
    if (!user) {
      return {
        error: `User with publicAddress ${publicAddress} is not found in database`,
      };
    }
    const authen = [
      authenticationServices.verifyDigitalSignature,
      authenticationServices.generateNewNonce,
      authenticationServices.createJWT,
    ];
    for (let i = 0; i < authen.length; i++) {
      let resultFunction = await authen[i](user, publicAddress, signature);
      if (!resultFunction) {
        switch (i) {
          case 0:
            error = "Signature verification failed";
            break;
          case 1:
            error =
              'User is not defined in "Generate a new nonce for the user"';
            break;
          case 2:
            error = "Create new access token failed!";
            break;
          default:
            error = null;
        }
        break;
      }
      accessToken = resultFunction;
    }
    return error ? {error} : {accessToken};
  },
};

module.exports = authenticationServices;
