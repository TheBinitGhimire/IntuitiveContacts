import express from "express";
import appRoutes from "./app.route.js";
import sysRoutes from "./sys.route.js";

const router = express.Router();

router.get("/status", (req, res) => res.send("Working fine!"));

router.use("/app", appRoutes);
router.use("/sys", sysRoutes);

export default router;