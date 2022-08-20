const  express = require("express");
require("./db");
const userRoutes = require("./routes/user_routes");
const cvRoutes = require("./routes/cv_routes");

const  app = express();
const  port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", cvRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
    });

app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`);
    });