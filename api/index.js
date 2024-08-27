import app from "./app.js"
import { conecDB } from "./db.js"

conecDB();
app.listen(3000)
console.log("server on 3000")