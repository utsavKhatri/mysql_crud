import { Router } from "express";
import { connection } from "../controllers/userController.js";
// import { query } from "../lib/db";
const router = Router();
/* GET home page. */

router.get("/", (req, res) => {
  connection.query("select * from test1 order by id desc", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("home", { title: "the home page", data: data });
  });
});

router.get("/add", (req, res) => {
  res.render("add", { title: "the home page" });
});

router.post("/add", (req, res) => {
  const user = [req.body.name, req.body.email];
  console.log(req.body);

  // let str = "INSERT INTO test1 (name, email) VALUES"+ user
  connection.query(
    `INSERT INTO test1 (name, email) VALUES ("${req.body.name}","${req.body.email}")`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.render("add", {
          title: "ADD PAge",
          name: user.name,
          email: user.email,
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

router.get("/edit/(:id)", function (req, res, next) {
  connection.query(
    "SELECT * FROM customers WHERE id = " + req.params.id,
    (err, rows) => {
          if (err)
              throw err;
          // if user not found
          else {
              // if user found
              // render to views/user/edit.ejs template file
              res.render("customers/edit", {
                  title: "Edit Customer",
                  //data: rows[0],
                  id: rows[0].id,
                  name: rows[0].name,
                  email: rows[0].email,
              });
          }
      }
  );
});

export default router;
