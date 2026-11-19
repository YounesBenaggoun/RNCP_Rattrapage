import app from "./app.js";
import "dotenv/config";

import pool from "./3_InfraStructure/database/database.js";

const PORT = process.env.PORT;

// import ConnectMongDB from "./3_InfraStructure/config/config.mongo.js";










app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});