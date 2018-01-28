let css = `
/*
* 你好，我是萧泳森。
* 我想通过这个小demo来介绍一下我自己
* 页面全白色的太单调了，先来加一些样式。
*/

*{
    transition: all 1s;
}

/* 
* 先加一个背景色吧。
* 字好像也小了一点，顺便把字变大一下吧。
*/ 

body{
    background: rgb(63, 82, 99);
}
#code{
    font-size: 16px;
}
/*
* 既然是要写代码，没有编辑器怎么行？模拟一下编辑器吧！
*/

pre{
    color: #fff;
}
#code-wrapper{
    width: 50%;
    padding:32px;
    float: left;
}
#code{
    border: 1px solid #ccc;
    background-color: #242424;
    padding: 32px;
    max-height: calc(100vh - 64px);
    overflow:auto;
}

/*
* 看起来有那么一点像编辑器了。 
* 写代码之前先准备一下代码高亮。
*/

.token.selector{
    color: #d1ba7d;   
}
.token.property{
    color: #9cdcfe;
}
.token.function{
    color: #dcd6a6;
}
.token.comment{
    color: #47844e;
}

/*
* 接下来，我需要一张白纸。在白纸上面描述我的个人信息。
*/
#paper{
    width: 50%;
    height: 100vh;
    padding:32px;
    float: right;
}
#content{
    color:#000;
    background:#fff;
    border:1px solid;
    max-height:100%;
    padding: 32px;
    overflow: auto;
}
/*
* 我开始在白纸上面写字啦。请将目光移到右边。
*/
`

let css2 = `
/**
 * 好的，markdown 写完了。
 * 接下来，我们将 markdown 转换成 html 吧。
 */
`
let css3 = 
`
/**
 * 好的，这就是我的全部简历了。
 * 谢谢您的观看。
 * 我的联系方式：
 * qq：603540681
 * 微信：603540681
 * 电话：18826132439
 */
`

let md = 
`# 自我介绍
我叫 萧泳森  
1995 年 11 月出生  
 广州航海学院 计算机科学与技术 毕业  
自学前端半年  
希望应聘前端开发岗位  
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

writeCss('', css, ()=>{
    addPaper(()=>{
        writeMardown(md,()=>{
            writeCss(css,css2,()=>{
                markdownToHtml(md,()=>{
                    writeCss(css+css2,css3)
                })
            })
        })
    })
})




/* helper */
function writeCss(prefix, css, fn){
    let n = 0
    let timer = setInterval(()=>{
        n += 1
        styleTag.innerHTML = prefix + css.substring(0, n)
        code.innerHTML = Prism.highlight(prefix + css.substring(0, n), Prism.languages.css);
        code.scrollTop = code.scrollHeight
        if(n > css.length){
            clearInterval(timer)    
            fn && fn.call()
        }
    },70)
}

function addPaper(fn){
    let paper = document.createElement('div')
    let content = document.createElement('pre')
    paper.id = 'paper'
    content.id = 'content'
    document.body.appendChild(paper)
    paper.appendChild(content) 
    fn && fn.call()
}

function writeMardown(mdText,fn){
    let content = document.querySelector('#content') 
    let n = 0
    let timer = setInterval(()=>{
        n += 1

        content.innerHTML = mdText.substring(0,n)
        content.scrollTop = content.scrollHeight
        if(n > mdText.length){
            clearInterval(timer)
            fn && fn.call()
        }
    },70)
}

function markdownToHtml(mdText, fn){
    let div = document.createElement('div')
    div.className = 'html markdown-body'
    let htmlText = marked(mdText)
    div.innerHTML = htmlText
    content.replaceWith(div)
    fn && fn.call()
}


