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
    // console.log(ctx.state.tokencode)
    let mdExist = fs.existsSync(path.join(__dirname, '../index.md'))
    if (mdExist) {
        let data = fs.readFileSync(path.join(__dirname, '../index.md'), 'utf8')
        let html = marked(data)
        console.log(html)
        ctx.body=html
    }

}

module.exports=notice
