import express from "express";
import userRouter from "./src/routes/user.routes.js";
import membershipRouter from "./src/routes/membership.routes.js"
import paymentRouter from "./src/routes/payment.routes.js"
import attendanceRouter from "./src/routes/attendance.routes.js"
import admindRouter from "./src/routes/admind.routes.js"
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3001',
        // Confía en la información del proxy
        trustProxy: true,
        credentials: true
    }
));
app.use(morgan('short'));
app.use(express.json());
app.use(cookieParser());
//apis
app.use('/api', userRouter);
app.use('/api', membershipRouter);
app.use('/api', paymentRouter);
app.use('/api', attendanceRouter);
app.use('/api', admindRouter);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})
console.log("server on port", 3000);

app.listen(3000);

