import app from "./app.js"
import { conecDB } from "./db.js"

const PORT = 4000

conecDB();
app.listen(PORT)
console.log(`server running at port: ${PORT}`)