import { Router } from "express";
import { connection } from "../controllers/userController.js";
// import { query } from "../lib/db";
const router = Router();
/* GET home page. */

router.get("/", (req, res) => {
  connection.query("select * from test1 order by id", (err, data) => {
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
  const user = [req.body.name, req.body.email, req.body.designation, req.body.number];
  console.log(user);

  // let str = "INSERT INTO test1 (name, email) VALUES"+ user
  connection.query(
    `INSERT INTO test1 (name, email, designation, number) VALUES ("${req.body.name}","${req.body.email}","${req.body.designation}","${req.body.number}")`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.render("add", {
          title: "ADD PAge",
          name: user.name,
          email: user.email,
          designation: user.designation,
          number: user.number
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

router.get("/edit/:id", function (req, res, next) {
  connection.query(
    `SELECT * FROM test1 WHERE id = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      // if user not found
      else {
        // if user found
        console.log(data);
        // render to views/user/edit.ejs template file
        res.render("edits", {
          title: "Edit User",
          data: data,
        });
      }
    }
  );
});

router.post("/edit/:id", (req, res) => {
  const updateUser = [req.body.name, req.body.email];
  console.log(updateUser);
  connection.query(
    `UPDATE test1
  SET name = '${req.body.name}', email = '${req.body.email}', designation = '${req.body.designation}', number='${req.body.number}'
  WHERE id = ${req.params.id};`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.render("edits", {
          title: "Edit User",
          data: req.body,
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

router.delete("/deleteUser/:id", (req, res) => {
  const deleteId = req.params.id;
  console.log(deleteId);
  connection.query(`DELETE FROM test1 WHERE id='${deleteId}';`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).render("404");
    } else {
      res.json({ redirect: "/" });
    }
  });
});

export default router;
