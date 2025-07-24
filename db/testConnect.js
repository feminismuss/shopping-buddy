import mongoose from "mongoose";

const uri =
  "mongodb+srv://feminismuss:wischiwaschi3x3@cluster0.c07zcpf.mongodb.net/shopping-buddy?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Verbindung erfolgreich!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Verbindung fehlgeschlagen:", err.message);
    process.exit(1);
  });
