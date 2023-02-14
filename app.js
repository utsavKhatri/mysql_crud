import express from "express";
import { connection } from "./controllers/userController.js";
import router from "./routes/customerRoutes.js";
const app = express();

app.use("/public", express.static("public"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

connection.connect((err, data)=>{
  if (err) {
    console.log(err);
  }
  else{
    console.log("connected successful");
  }
})

// app.get('/', (req, res)=>{
//   res.render('home', {title: "This home page"})
// })

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/customers', customersRouter);

app.use(router)

app.use((req,res)=>{
  res.status(400).render('404',{title: "404 not found"})
})

app.listen(3000);
console.log(`you are listening to http://localhost:3000/`);
