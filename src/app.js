
import express from "express";
import oniRouter from "./4_Presentation/routes/oni.route.js";



const app = express();

app.use(express.json());

app.use("/oni", oniRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));


app.use((req, res) =>
    res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } })
);


export default app;