/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库（只有当连接上数据库后才去启动服务器）
3. 使用中间件
 */

//建立数据库连接
const mongoose = require('mongoose')
const express = require('express')

// 产生应用对象
const app = express() 

// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser') 

// 声明使用路由器中间件
// const indexRouter = require('./routes') 

// 声明使用静态中间件
app.use(express.static('public'))

// 声明使用解析post请求的中间件
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

// app.use('/', indexRouter)

mongoose.connect('mongodb://localhost/blog_db')
  .then(() => {
    console.log('连接数据库成功!')
    // 只有当连接上数据库后才去启动服务器
    app.listen('5000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:5000')
    })
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })