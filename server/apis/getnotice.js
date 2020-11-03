const marked = require('marked');
const fs=require("fs")
const path=require("path")

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});


const notice=async(ctx)=>{
    // console.log(ctx.state.userinfo.expires)
    // console.log(Date.now())

    // let mdExist = fs.existsSync(path.join(__dirname, '../index.md'))
    // if (mdExist) {
    //     let data = fs.readFileSync(path.join(__dirname, '../index.md'), 'utf8')
    //     let html = marked(data)
    //     console.log(html)
    //     ctx.body={
    //         readme:html,

    //     }
    // }

    let htmlExist = fs.existsSync(path.join(__dirname, '../index.html'))
    if (htmlExist) {
        let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
        console.log(html)
        ctx.body={
            readme:html,

        }
    }

}

module.exports=notice
