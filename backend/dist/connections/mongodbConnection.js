import { connect } from "mongoose";
export const connectDb = async () => {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error('Unable to connect DB');
    }
};
//# sourceMappingURL=mongodbConnection.js.map