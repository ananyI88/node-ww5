import  express  from "express";
import { conn } from "../dbconn";

export const router = express.Router();

router.delete("/creators/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Acreators where cid = ?", [id], (err, result) => {
       if (err) throw err;
       res.status(200).json({ affected_row: result.affectedRows });
    });
  });

  router.delete("/movie/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Amovie where mid = ?", [id], (err, result) => {
       if (err) throw err;
       res.status(200).json({ affected_row: result.affectedRows });
    });
  });

  router.delete("/person/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Aperson where pid = ?", [id], (err, result) => {
       if (err) throw err;
       res.status(200).json({ affected_row: result.affectedRows });
    });
  });

  router.delete("/star/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Astar where sid = ?", [id], (err, result) => {
       if (err) throw err;
       res.status(200).json({ affected_row: result.affectedRows });
    });
  });