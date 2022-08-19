import fastify from "fastify";
import * as dotenv from "dotenv";
import MongoosePlugin from "./helpers/MongoosePlugin"

dotenv.config();

const app = fastify({
	logger: process.env.NODE_ENV !== "production"
});

app.register(MongoosePlugin, {
	uri: process.env.MONGO_URI
});

export default app;
