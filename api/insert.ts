import express from "express";
import mysql from "mysql";
import { conn } from "../dbconn";
import { creator, movie, person, star } from "../model/movie";
// import { person } from '../model/person';

export const router = express.Router();
router.post("/movie", (req, res) => {
    const insert: movie = req.body;
    let sql =
        "INSERT INTO `Amovie`(`name`, `rate`, `time`, `detail`, `release`, `type`) VALUES (?,?,?,?,?,?)";
    sql = mysql.format(sql, [
        insert.name,
        insert.rate,
        insert.time,
        insert.detail,
        insert.release,
        insert.type
    ]);
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err); // Log ข้อผิดพลาด
            return res.status(500).send(err); // ส่ง HTTP status 500 และข้อความผิดพลาดกลับไปให้กับไคลเอนต์
        }
        res.status(200).json({
            affectedRows: result.affectedRows,
        });
    });
});

router.post("/person", (req, res) => {
    const person: person = req.body;
    let sql =
        "INSERT INTO `Aperson`(`name`, `birthdate`, `detail`, `rank`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
        person.name,
        person.birthdate,
        person.detail,
        person.rank,
    ]);
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err); // Log ข้อผิดพลาด
            return res.status(500).send(err); // ส่ง HTTP status 500 และข้อความผิดพลาดกลับไปให้กับไคลเอนต์
        }
        res.status(200).json({
            affectedRows: result.affectedRows,
        });
    });
});

router.post("/creator", (req, res) => {
    const creater : creator = req.body;
    let sql =
        "INSERT INTO `Acreators`(`pid`, `mid`) VALUES (?,?)";
    sql = mysql.format(sql, [
        req.body.pid,
        req.body.mid,
    ]);
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err); // Log ข้อผิดพลาด
            return res.status(500).send(err); // ส่ง HTTP status 500 และข้อความผิดพลาดกลับไปให้กับไคลเอนต์
        }
        res.status(200).json({
            affectedRows: result.affectedRows,
        });
    });
});

router.post("/star", (req, res) => {
    const star : star = req.body;
    let sql =
        "INSERT INTO `Astar`(`pid`, `mid`) VALUES (?,?)";
    sql = mysql.format(sql, [
        req.body.pid,
        req.body.mid,
    ]);
    conn.query(sql, (err, result) => {
        if (err) {
            console.error(err); // Log ข้อผิดพลาด
            return res.status(500).send(err); // ส่ง HTTP status 500 และข้อความผิดพลาดกลับไปให้กับไคลเอนต์
        }
        res.status(200).json({
            affectedRows: result.affectedRows,
        });
    });
});