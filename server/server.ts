import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());
const port = process.env.PORT || 3001;


const headers = {
  "Authorization": `Bearer ${process.env.VTN_APIKEY}`,
  "Content-Type": "application/json",
  "x-application-vkn": `${process.env.VTN_APPID}`,
}


app.get("/", (req: Request, res: Response) => {
  res.header(headers).send("Hello World!");
});

app.post("/api/nfts", async (req: Request, res: Response) => {
  const vottunUrl = "https://api.vottun.tech/erc/v1/erc721/tokenUri";


  const nfts = [];

  for (let i = 1; i <= 3; i++) {
    const nft = await axios.post(vottunUrl, {
      "contractAddress": "0x4E8B76631343086813eE4191F0070E2C6917FBDe",
      "network": 80001,
      "id": i
    }, {
      headers: headers
    });
    const nftParsed = await axios.get(nft.data.uri);
    nfts.push(nftParsed.data);
  }

  //nfts.push(nft.data);
  


  res.send(nfts);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});