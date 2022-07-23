import express from 'express'
import youtubesearchapi from 'youtube-search-api'
const app = express()
const port = 3000 || process.env.port

app.get('/', (req, res) => {
    let response = youtubesearchapi.GetListByKeyword(req.query.q, false, 20)
    response.then(data => {
        res.send(data);
    })
})

app.get('/next', (req, res) => {
    let objs = JSON.parse(req.query.nextPage)
    let response = youtubesearchapi.NextPage(objs, false, 20)
    response.then(data => {
        res.send(data);
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})