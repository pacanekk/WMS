const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const md5 = require("md5")

const app = express()
app.use(cors())
const port = 3000

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wms"
})

con.connect(function(err) {
  if (err) throw err
  console.log("Database connected!")
})

//-----------------------------------------------------------

app.get("/reg/:name/:sname/:login/:pass/:perms", (req, res) => {
    const name = req.params.name
    const sname = req.params.sname
    const login = req.params.login
    const pass = md5(req.params.pass)
    const perms = req.params.perms

    const sql = `INSERT INTO users(name, sname, login, pass, perms) VALUES ('${name}', '${sname}', '${login}', '${pass}', '${perms}')`
    console.log(sql)

        con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: "error",
                err_info: err
            })
        }
        console.log("Dodano użytkownika!")
        res.json({status: "OK"})
        })
})

app.get("/log/:login/:pass", (req, res) => {
    const login = req.params.login
    const pass = md5(req.params.pass)

    const sql = `SELECT * FROM users WHERE login='${login}' AND pass='${pass}'`

        con.query(sql, (err, result) => {
        if (err) {
            res.json({status: "error"
            })
        } else {
            if(result.length == 0){
                res.json({status: "notOK"})
            } else {
                res.json({status: "OK",
                    login: result[0].login,
                    perms: result[0].perms})
            }
        }
        })
})

//-----------------------------------------------------------

app.get("/product-list", (req, res) => {

    const sql = "SELECT ID, name, `desc`, stock FROM products"

    con.query(sql, (err, result) => {
        if (err) {
            console.error(err)
            return res.json({ status: "error" })
        }

        res.json({
            status: "OK",
            products: result
        })
    })
})

app.get("/addProduct/:name/:desc/:stock", (req, res) => {
    const name = req.params.name
    const desc = req.params.desc
    const stock = req.params.stock

    const sql = `INSERT INTO products(name, \`desc\`, stock) VALUES ('${name}', '${desc}', ${stock})`

    console.log(sql)

        con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: "error",
                err_info: err
            })
        }
        console.log("Dodano produkt!")
        res.json({status: "OK"})
        })
})

app.get("/remProduct/:ID", (req, res) => {
    const ID = req.params.ID

    const sql = `DELETE FROM products WHERE ID = ${ID}`

    con.query(sql, [ID], (err, result) => {
        if (err) return res.json({status: "error", err_info: err})

        res.json({ status: "OK" })
    })
})

app.get("/changeStock/:ID/:choice/:quantity", (req, res) => {
    const { ID, choice, quantity } = req.params
    const qty = Number(quantity)

    if (!ID || isNaN(qty)) {
        return res.json({status: "error", message: "Błędne dane"})
    }

    const sql = `UPDATE products SET stock = stock ${choice === "add" ? "+" : "-"} ${qty} WHERE ID = ?`

    con.query(sql, [ID], (err, result) => {
        if (err) return res.json({status: "error", err_info: err})

        res.json({ status: "OK" })
    })
})


//-----------------------------------------------------------

app.listen(port, () => {
    console.log("Server OK: ", port)
})