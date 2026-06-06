import express from "express";
import B2 from "backblaze-b2";

const app = express();
app.use(express.json());

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY
});

async function startServer() {
  try {
    await b2.authorize();
    console.log("Backblaze authorized");

    app.post("/get-upload-url", async (req, res) => {
      try {
        const bucketId = process.env.B2_BUCKET_ID;
        const response = await b2.getUploadUrl({ bucketId });
        res.json(response.data);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


  } catch (err) {
    console.error("Failed to authorize Backblaze:", err);
    process.exit(1);
  }
}

startServer();
