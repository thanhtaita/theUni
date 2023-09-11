/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

const app = express();
app.use(cors());

const jwtCheck = auth({
  audience: "this is a test",
  issuerBaseURL: "https://dev-ndfot0xui64cmohw.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.get("/", (req, res) => {
  res.send("Hello from index route");
});

app.get("/protected", jwtCheck, async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-ndfot0xui64cmohw.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).error(message);
});

app.listen(4000, () => console.log("Server on port 4000"));
