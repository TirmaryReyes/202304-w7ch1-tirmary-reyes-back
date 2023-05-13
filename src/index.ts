import "./loadEnvironment.js";
import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";
import app from "./server/index.js";

const debug = createDebug("robots-api:root");

const port = process.env.PORT ?? 3000;

const mongodbConnection = process.env.MONGODB_CONNECTION!;

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

try {
  await mongoose.connect(mongodbConnection);
  debug("Connected to database");
} catch (error: unknown) {
  debug(`Connection error: ${chalk.red((error as Error).message)}`);
}
