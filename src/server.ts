import app from "./app";

app.listen({
	host: process.env.NODE_HOST,
	port: parseInt(process.env.NODE_PORT ?? "8080")
}, (error) => {
	if (error !== null) {
		console.error("error", error);
		process.exit(1);
	}
});
