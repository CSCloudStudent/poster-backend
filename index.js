import express from "express";
import { B2 } from "b2sdk";

const app = express();
app.use(express.json());

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
});

await b2.authorize();

app.post("/get-upload-url", async (req, res) => {
  try {
    const bucketId = process.env.B2_BUCKET_ID;
    const response = await b2.getUploadUrl({ bucketId });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log("Backend running on port 10000"));
