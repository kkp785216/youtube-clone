import express from 'express'
import youtubesearchapi from 'youtube-search-api'
const app = express()
const port = 3000 || process.env.port

app.get('/', (req, res) => {
    let maxResult = req.query.maxResult !== undefined ? req.query.maxResult : 20;
    let response = youtubesearchapi.GetListByKeyword(req.query.q, false, maxResult)
    response.then(data => {
        res.send(data);
    })
})

app.get('/next', (req, res) => {
    let maxResult = req.query.maxResult !== undefined ? req.query.maxResult : 20;
    let objs = JSON.parse(req.query.nextPage)
    let response = youtubesearchapi.NextPage(objs, false, maxResult)
    response.then(data => {
        res.send(data);
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
