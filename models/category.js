/*
操作category集合数据的model
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 定义Schema
const categorySchema = new Schema({

  // 分类名称
  category: { type: String, required: true }
})

// 向外暴露Model
module.exports = mongoose.model('Category', categorySchema)