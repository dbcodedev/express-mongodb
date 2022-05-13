const express = require("express")
const author = require("../models/author")
const router = express.Router()
const Author = require("../models/author")

router.get("/", async (req, res) => {
    try {
        let searchOptions = {}
        if (req.query.name && req.query.name !== "") {
            searchOptions.name = new RegExp(req.query.name, "i")
        }
        const authors = await Author.find(searchOptions)
        res.render("authors/index", { authors, searchOptions: req.query })
    } catch {
        res.render("/", {
            errorMessage: "Error getting authors"
        })
    }
})

router.get("/new", (req, res) => {
    res.render("authors/new", {
        author: new Author()
    })
})

router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render("authors/new", {
            author: author,
            errorMessage: "Error creating author"
        })
    }
})

module.exports = router