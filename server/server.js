import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is Liveee");
})

app.use("/api/inngest", serve({ client: inngest, functions }));


const PORT = process.env.PORT || 3000;
app.use(clerkMiddleware())

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;
