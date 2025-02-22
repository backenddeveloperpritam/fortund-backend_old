import express from "express";
import db from "./config/db.js";

import appRoutes from "./routes/application/application.routes.js";
import astroAppRoutes from "./routes/application/astrologer.routes.js";
import astrologerRequestRoute from "./routes/application/astrologerRequest.routes.js";

import blogCategoryRoute from "./routes/admin/blogcagegory.route.js";
import astrologerRoute from "./routes/admin/astrologer.route.js";
import SkillRoute from "./routes/admin/skill.route.js";
import SubSkillRoute from "./routes/admin/subSkill.route.js";
import ExpertiesRoute from "./routes/admin/expertise.route.js";

import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 4000;

console.log(`Ports: ${PORT}`);

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors('*'));
db();

// Define the API routes
app.use("/api/app", appRoutes);
app.use("/api/app", astroAppRoutes);
app.use("/api/app", astrologerRequestRoute);

app.use("/api/admin", astrologerRoute);
app.use('/api/admin', blogCategoryRoute);
app.use('/api/admin', SkillRoute);
app.use('/api/admin', SubSkillRoute);
app.use('/api/admin', ExpertiesRoute);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
