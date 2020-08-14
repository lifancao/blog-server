/*
定义路由的路由器模块
 */

const express = require('express')
const md5 = require('blueimp-md5')

const Article = require('../models/Article')
const Category = require('../models/Category')
const User = require('../models/User')

// 得到路由器对象
const router = express.Router()

// 1. 登录
router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username, password: md5(password) })
    .then(user => {
      if (user) {
        res.send({ status: 0, msg: '登录成功!' })
      } else {// 登陆失败
        res.send({ status: 1, msg: '用户名或密码不正确!' })
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({ status: 1, msg: '登陆异常, 请重新尝试!' })
    })
})

// 2. 获取分类列表
router.get('/manage/category/list', (req, res) => {
  Category.find({})
    .then(categorys => {
      res.send({ status: 0, data: categorys })
    })
    .catch(error => {
      res.send({ status: 1, msg: '获取分类列表异常, 请重新尝试!' })
    })
})

// 3. 添加分类
router.post('/manage/category/add', (req, res) => {
  const { category } = req.body
  Category.findOne({ category: category })
    .then(category => {
      if (category) {
        res.send({ status: 1, msg: '此分类已存在!' })
      } else {
        Category.create(req.body)
          .then(result => {
            res.send({ status: 0, data: req.body })
          })
          .catch(error => {
            res.send({ status: 1, msg: '添加分类异常, 请重新尝试!' })
          })
      }
    })
})

// 4. 删除分类
router.post('/manage/category/delete', (req, res) => {
  const { category } = req.body
  Category.deleteOne({ category: category })
    .then(result => {
      res.send({ status: 0, msg: '删除分类成功!' })
    })
    .catch(error => {
      res.send({ status: 1, msg: '删除分类异常, 请重新尝试!' })
    })
})

// 5. 获取文章列表
router.get('/manage/article/list', (req, res) => {
  Article.find({})
    .then(articles => {
      res.send({ status: 0, data: articles })
    })
    .catch(error => {
      res.send({ status: 1, msg: '获取文章列表异常, 请重新尝试!' })
    })
})

// 6. 添加文章
router.post('/manage/article/add', (req, res) => {
  const article = req.body
  Article.findOne({ title: article.title })
    .then(article => {
      if (article) {
        res.send({ status: 1, msg: '此文章已存在!' })
      } else {
        Article.create(req.body)
          .then(result => {
            res.send({ status: 0, data: req.body })
          })
          .catch(error => {
            res.send({ status: 1, msg: '添加文章异常, 请重新尝试!' })
          })
      }
    })
})

// 7. 更新文章
router.post('/manage/article/update', (req, res) => {
  const article = req.body
  article.update_time = Date.now()
  Article.updateOne({ _id: article._id }, article)
    .then(result => {
      res.send({ status: 0, msg: '更新文章成功!' })
    })
    .catch(error => {
      res.send({ status: 1, msg: '更新文章异常, 请重新尝试!' })
    })
})

// 8. 删除文章
router.post('/manage/article/delete', (req, res) => {
  const { articleId } = req.body
  Category.deleteOne({ _id: articleId })
    .then(result => {
      res.send({ status: 0, msg: '删除文章成功!' })
    })
    .catch(error => {
      res.send({ status: 1, msg: '删除文章异常, 请重新尝试!' })
    })
})

module.exports = router