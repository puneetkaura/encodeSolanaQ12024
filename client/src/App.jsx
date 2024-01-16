import React from 'react';
// Retrieve accounts muted by authenticated user
// https://developer.twitter.com/en/docs/twitter-api/users/mutes/quick-start
import axios from 'axios';
import CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = "wy3RBT9kwTDdJAVvNyxYoXqZ5";
const consumer_secret = "Ey1ZfUtPg5CQ9PtirRl1S5B2uGHSNOwYvDJFZYvpJafmYV4nEc";

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL =
  "https://api.twitter.com/oauth/request_token?oauth_callback=oob";
const authorizeURL = new URL("https://api.twitter.com/oauth/authorize");
const accessTokenURL = "https://api.twitter.com/oauth/access_token";
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) => CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64)
});

async function requestToken() {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: requestTokenURL,
      method: "POST",
    })
  );

  const req = await axios.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"],
    },
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error("Cannot get an OAuth request token");
  }
}

async function accessToken({ oauth_token, oauth_token_secret }) {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: accessTokenURL,
      method: "POST",
    })
  );
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier="verifier"&oauth_token=${oauth_token}`;
  const req = await axios.post(path, {
    headers: {
      Authorization: authHeader["Authorization"],
    },
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error("Cannot get an OAuth request token");
  }
}

const TwitterSignInButton = () => {
  const handleTwitterSignIn = async () => {
      try {
        // Get request token
        const oAuthRequestToken = await requestToken();
        // Get authorization
        authorizeURL.searchParams.append(
          "oauth_token",
          oAuthRequestToken.oauth_token
        );
        console.log("Please go here and authorize:", authorizeURL.href);
        // Get the access token
        const oAuthAccessToken = await accessToken(oAuthRequestToken);
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '45%' }}>
      <button onClick={handleTwitterSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Sign in with Twitter
      </button>
    </div>
  );
};

export default TwitterSignInButton;
