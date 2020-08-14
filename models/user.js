/*
操作user集合数据的model
 */

const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

const Schema = mongoose.Schema

// 定义Schema
const userSchema = new Schema({

  // 用户名
  username: { type: String, required: true },

  // 密码
  password: { type: String, required: true }
})

// 初始化默认管理员用户: admin/admin
User.findOne({ username: 'admin' }).then(user => {
  if (!user) {
    User.create({ username: 'admin', password: md5('admin') })
  }
})

// 向外暴露userModel
module.exports = User