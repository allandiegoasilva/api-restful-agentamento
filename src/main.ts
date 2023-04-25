import express, { Response, Request } from 'express';
import routes from './presentation/routes';
import cors from "cors";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors({
  origin: "*",
  methods: ""
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.use('/api/', routes);

app.use((req : Request, res : Response) => {
  console.log(req.url)

  res.status(404).json({
    message: "route not found!"
  })
})

app.listen(PORT, () => console.log(`server running at ${PORT}`))