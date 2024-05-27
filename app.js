import express from "express";
import db from "./config/db.js";

// import customerRoutes from "./routes/customerRoutes.js";
// import kundliRoutes from "./routes/kundliRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import appRoutes from "./routes/application/application.routes.js"
import astroAppRoutes from "./routes/application/astrologer.routes.js"
import astrologerRequestRoute from "./routes/application/astrologerRequest.routes.js";

// import astrologerRoutes from "./routes/astrologerRoutes.js";
// import webRoutes from './routes/webRoutes.js';
import blogCategoryRoute from "./routes/admin/blogCagegory.route.js";
import astrologerRoute from "./routes/admin/astrologer.route.js";


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

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors('*'));
db(); 
// // Define the API routes
app.use("/api/app", appRoutes)
app.use("/api/app", astroAppRoutes)
app.use("/api/app", astrologerRequestRoute)
// app.use("/api/customers", customerRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/astrologer", astrologerRoutes);
// app.use('/api/kundli', kundliRoutes);
// app.use('/api/web', webRoutes);

app.use("/api/admin", astrologerRoute);
app.use('/api/admin', blogCategoryRoute);


// app.use("/api/kundli", kundliRoutes) 
// app.use('/notification', notificationRoutes);

// app.use('/images', express.static('uploadImage'));

// initializeSocketIO(io)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
