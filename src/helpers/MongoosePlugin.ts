import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import mongoose, { ConnectOptions, Schema, Mongoose } from "mongoose";

const DEFAULT_OPTIONS: MongoosePluginOptions = {
	uri: "mongodb://localhost/db",
	connectOptions: {
		autoIndex: false,
		autoCreate: true,
	}
};

export default fp(async (app: FastifyInstance, options?: Partial<MongoosePluginOptions>) => {
	await mongoose.connect(
		options?.uri ?? DEFAULT_OPTIONS.uri,
		{
			...options?.connectOptions,
			...DEFAULT_OPTIONS.connectOptions
		});

	app.decorate("mongoose", mongoose);

	for (const [name, schema] of Object.entries(options?.schemas ?? {})) {
		mongoose.model(name, schema);
	}

	app.addHook("onClose", (app, done) => {
		mongoose.disconnect(done as () => void);
	});
});

export interface MongoosePluginOptions {
	uri: string
	connectOptions: ConnectOptions
	schemas?: Record<string, Schema>
}
