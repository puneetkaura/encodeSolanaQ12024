import React from "react";
// Retrieve accounts muted by authenticated user
// https://developer.twitter.com/en/docs/twitter-api/users/mutes/quick-start
import axios from "axios";
import CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";
import qs from "querystring";

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = "TqwCvDuTBwEl1YZnvVY4inAls";
const consumer_secret = "FswQxfL61H6ivGJkvT1jqMAi2dCj1PaQM2IFgTDKjqxxaFZHgU";

const proxyUrl = "https://cors-anywhere.herokuapp.com/" 
const twitterUrl = "https://api.twitter.com";
const requestTokenURL = proxyUrl + twitterUrl + "/oauth/request_token?oauth_callback=" + encodeURIComponent("http://localhost:5173/");
const authorizeURL = new URL(proxyUrl + twitterUrl + "/oauth/authorize");
const accessTokenURL = proxyUrl + twitterUrl + "/oauth/access_token";
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64),
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
  const path = proxyUrl + twitterUrl + `/oauth/access_token?oauth_verifier=1234567&oauth_token=${oauth_token}`;
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
    <div>
      <button
        onClick={handleTwitterSignIn}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Sign in with X / Twitter
      </button>
    </div>
  );
};

export default TwitterSignInButton;
