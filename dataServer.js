const path = require('path')
const fs = require('fs')

export default (req, res, next) => {
  // 获取异步请求的地址
  const url = req.url

  if (url.indexOf('.json') > -1 && url.indexOf('data/') > -1) {
    // 截取所要的路径
    // @todos 无视参数
    const _temp = url.indexOf('?')
    const strPath = url.slice(1, _temp === -1 ? url.length : _temp)

    try {
      fs.accessSync(path.resolve(__dirname, strPath))
    } catch (err) {
      res.writeHead(404)
      res.end()
    }

    // const dataInfo = fs.readFileSync(path.resolve(__dirname, strPath), 'utf8')

    // if (dataInfo) {
    //   res.writeHead(200, { 'Content-Type': 'application/json' })
    //   res.end(dataInfo)
    // }

    // 使用文件流的方式来读取文件

    const readFileSteam = fs.createReadStream(path.resolve(__dirname, strPath))
    let str2JSON = ''
    readFileSteam.on('data', data => {
      str2JSON += data
    })

    readFileSteam.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(str2JSON)
    })
  } else {
    // 不是获取 .json 文件的请求
    next()
  }
}

const queryString = (str, sep = '&', equ = '=') =>
  str.split(sep).reduce((pre, cur) => {
    const localPre = Object.assign({}, pre)
    localPre[cur.split(equ)[0]] = cur.split(equ)[1]
    return localPre
  }, {})

const postInfo = (req, res, next) => {
  if (req.method === 'POST') {
    // 代表是表单提交    
    let jsonString = ''

    req.on('data', data => {
      jsonString += data

      if (jsonString.length > 1e6) {
        // request entity too large >= 1MB 413
        res.writeHead(413, { 'Content-Type': 'text/plain' }).end()
        req.connection.destroy()
      }
    })

    req.on('end', () => {
      try {
        fs.accessSync(path.resolve(__dirname, 'data/comments.json'))
      } catch (err) {
        res.writeHead(404)
        res.end()
      }

      const commentsInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data/comments.json'), 'utf8'))

      if (!commentsInfo) {
        res.writeHead(404)
        res.end()
      } else {
        const newCommentsInfo = Object.assign({}, commentsInfo)
        newCommentsInfo.commentList.push({
          id: newCommentsInfo.commentList[newCommentsInfo.commentList.length - 1].id + 1,
          name: `Test${parseInt(Math.random() * 100, 10)}`,
          content: queryString(jsonString).content,
          publishTime: new Date().toLocaleDateString(),
        })
        fs.writeFileSync(path.resolve(__dirname, 'data/comments.json'), JSON.stringify(newCommentsInfo))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          status: true,
        }))
      }
    })
  } else {
    next()
  }
}

export {
  postInfo as post4Comments,
}
