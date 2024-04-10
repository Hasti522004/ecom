const express = require('express');
const cors = require('cors');
const category = require("./src/category/category.routes");
const product = require("./src/product/product.routes")
const errors = require("./src/middleware/error");
const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/category", category);
app.use("/product", product);

app.get('/test-error', (req, res, next) => {
    try {
      // Simulate an error condition (e.g., resource not found)
      throw new Error('Resource not found');
    } catch (error) {
      // Pass the error to the next middleware (errorHandler)
      next(error);
    }
  });

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))