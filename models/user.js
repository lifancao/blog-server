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
  password: { type: String, required: true },

  // 手机号
  phone: { type: String },

  // 邮箱
  email: { type: String },

  // 创建日期
  create_time: { type: Number }
})

// 定义Model
const User = mongoose.model('User', userSchema)

// 初始化默认管理员用户: admin/admin
User.findOne({ username: 'admin' }).then(user => {
  if (!user) {
    User.create({ username: 'admin', password: md5('admin') })
      .then(user => {
        console.log('初始化用户: 用户名: admin 密码为: admin')
      })
  }
})

// 向外暴露userModel
module.exports = User