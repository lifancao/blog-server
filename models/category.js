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

// 定义Model
const Category = mongoose.model('Category', categorySchema)

// 向外暴露categoryModel
module.exports = Category