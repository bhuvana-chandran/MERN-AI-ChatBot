import { connect, disconnect } from "mongoose";
async function connectToDataBase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Unable to connect DB");
    }
}
async function disconnectFromDataBase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Unable to disconnect DB");
    }
}
export { connectToDataBase, disconnectFromDataBase };
//# sourceMappingURL=connection.js.map