import express from 'express'
import youtubesearchapi from 'youtube-search-api'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let response = youtubesearchapi.GetListByKeyword("radhe radhe", false, 20)
    response.then(data=>{
        let response = youtubesearchapi.NextPage(data.nextPage,false,20)
        response.then(data=>{
            res.send(data);

        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})