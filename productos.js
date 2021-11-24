const fs = require("fs");
let express = require("express");
const { json } = require("express");
let app = express();



class Contenedor {
    constructor(url) {
        this.url = url;
        this.contador = 0
    }
    async save(item) {
        try {
            this.contador++;
            data.push(
                {
                    ...item, id: this.contador
                }
            )
            let productos = JSON.stringify(data)
            fs.writeFileSync(this.url, `${productos} \n`)
        } catch (error) {
            throw new Error(error)
        }
    }
    async getById(id, res) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8')
            data = JSON.parse(data)
            let getItem = data.filter(item => item.id === parseFloat(id))
            if (getItem.length >= 1) {
                return res.json(getItem)
            } else {
                return res.json({ error: "Producto no encontrado" })
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    async getAll(res) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8')
            data = JSON.parse(data)
            res.send(data)
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteById(id) {
        try {
            let data = fs.readFileSync(this.url, 'utf-8')
            data = JSON.parse(data)
            let deleteItem = data.filter(item => item.id !== parseFloat(id))
            deleteItem = JSON.stringify(deleteItem);
            return await fs.promises.writeFile(this.url, deleteItem);
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll() {
        try {
            return await fs.promises.writeFile(this.url, "")
        } catch (error) {
            throw new Error(error)
        }
    }
    async updateItem(id, price) {
        try {
            let data = fs.readFileSync(this.url, "utf-8")
            data = JSON.parse(data)
            let findItem = data.find(item => item.id === parseFloat(id))
            if (findItem) {
                findItem.price = price;
                data = JSON.stringify(data)
                fs.writeFileSync(this.url, data)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = data = [];

module.exports = Contenedor;


