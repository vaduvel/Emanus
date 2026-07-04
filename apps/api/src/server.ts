import cors from "cors"
import express, { type NextFunction, type Request, type Response } from "express"
import { registerRoutes } from "./routes.js"

const app = express()
app.use(cors())
app.use(express.json())

registerRoutes(app)

// Handler global de erori
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: "internal_error" })
})

const port = Number(process.env.PORT ?? 3000)
app.listen(port, () => {
  console.log(`Emanus API pornit pe http://localhost:${port}`)
})
