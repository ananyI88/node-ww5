import express from "express";
import { conn } from "../dbconn";
import { creator, movie, star } from "../model/movie";

export const router = express.Router();

router.get("/", (req, res) => {
  const name = req.query.name;
  conn.query(
// select movie ===========================================================================================
    `SELECT *
    FROM  Amovie
    WHERE name LIKE ?`,
    
    [name + "%"],
    (err, Movie_result) => {
      if (err) res.status(500).json({ error: "An error occurred." });
      
// select star by person ====================================================================================
      conn.query(
        `SELECT *
        FROM  Aperson
        INNER JOIN Astar
        ON    Aperson.pid = Astar.pid
        WHERE Astar.mid IN (
              SELECT  mid
              FROM    Amovie
              WHERE   name LIKE ?)`,

        [name + "%"],
        (err, Stars_result) => {
          if (err) res.status(500).json({ error: "An error occurred." });

// select actors by person ==================================================================================
          conn.query(
            `SELECT *
            FROM  Aperson
            INNER JOIN Acreators
            ON    Aperson.pid = Acreators.pid
            WHERE Acreators.mid IN (
                SELECT  mid
                FROM    Amovie
                WHERE   name LIKE ?)`,

            [name + "%"],
            (err, Creators_result) => {
              if (err) res.status(500).json({ error: "An error occurred." });
              
// Send response data => Json [ Star:array, Creators:array ] ================================================
// map เหมือนการสร้าง function like for i loop
// fillter คัดกรอง เอาเฉพาะที่ตรงเงื่อนไข
              res.json({
                Movie: Movie_result.map((Amovie: { mid: any }) => ({
                    Amovie,
                    Stars: Stars_result.filter(
                      (Astar: { mid: any }) => Astar.mid == Amovie.mid
                    ),
                    Creators: Creators_result.filter(
                      (Acreators: { mid: any }) => Acreators.mid == Amovie.mid
                    ),
                })),
              });
              

            }
          );
        }
      );
    }
  );
});

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
router.get("/s", (req, res) => {
  const name = req.query.name;
  conn.query(
    // Select movie
    `SELECT * 
    FROM  Amovie 
    WHERE name LIKE ?`,
    [name + "%"],
    (err, Movie_result) => {
      if (err) res.status(500).json({ error: "An error occurred." });

      // Select stars by person
      conn.query(
        `SELECT Aperson.pid as pid, Aperson.name as name
        FROM  Aperson 
        JOIN Astar 
        ON Aperson.pid = Astar.pid 
        WHERE Astar.mid IN (
              SELECT mid 
              FROM Amovie 
              WHERE Amovie.name LIKE ?)`,
        ["%" + name + "%"],
        (err, Stars_result) => {
          if (err) res.status(500).json({ error: "An error occurred." });

          // Select creators by person
          conn.query(
            `SELECT Aperson.name as name
            FROM  Aperson 
            INNER JOIN Acreators 
            ON Aperson.pid = Acreators.pid
            WHERE Acreators.mid IN (
                SELECT mid
                FROM Amovie
                WHERE Amovie.name LIKE ?)`,
            [name + "%"],
            (err, Creators_result) => {
              if (err) res.status(500).json({ error: "An error occurred." });

              // Send response data
              res.json({
                Movie: Movie_result.map((Amovie:movie) => ({
                  Amovie,
                  Stars:Stars_result.map((Astar:star) =>  Astar.name),
                  Creators:Creators_result.map((creator:creator) => creator.name), // Map only names
                
                })),
              });
            }
          );
        }
      );
    }
  );
});