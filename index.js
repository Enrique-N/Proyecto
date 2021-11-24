let express = require("express");
let Contenedor = require("./productos");
let contenedor = new Contenedor("./productos.txt")
let app = express();
const PORT = 3000;


contenedor.save({ tittle: "Lapiz", price: 15, thumb: "imagen.com/imagen" })
contenedor.save({ tittle: "Cuaderno", price: 25, thumb: "imagen.com/imagen" })
contenedor.save({ tittle: "Borrador", price: 5, thumb: "imagen.com/imagen" })

app.use("/", express.static("public/html"))
app.post("/", (req, res) => {
    let form = document.getElementById("form")
    form.addEventListener("submit", handleClick)
    function handleClick(e) {
        e.preventDefault()
        let data = {
            tittle: e.target.tittle.value,
            price: e.target.price.value,
            thumb: e.target.thumb.value
        }
    }
})

app.get("/productos", (req, res) => {
    contenedor.getAll(res);
})

app.get("/productos/:id", (req, res) => {
    let { id } = req.params
    contenedor.getById(id, res)
})

app.post("/productos", (req, res) => {
    let item = {
        tittle: req.query.tittle,
        price: req.query.price,
        thumb: req.query.thumb
    };
    contenedor.save(item)
    res.json(data[data.length - 1])
})

app.delete("/productos/:id", (req, res) => {
    let { id } = req.params
    contenedor.deleteById(id)
    res.send(`Se elimino el item con el ID: ${id}`)
})

app.put("/productos/:id", (req, res) => {
    let { id } = req.params;
    let price = parseFloat(req.query.price);
    contenedor.updateItem(id, price)
    contenedor.getAll(res)
})

app.listen(PORT, () => {
    console.log(`Escuchando puerto http://localhost:${PORT}`)
})