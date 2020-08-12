/*
操作article集合数据的model
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 定义Schema
const articleSchema = new Schema({

    // 文章标题
    title: { type: String, required: true },

    // 文章内容
    content: { type: String, required: true },

    // 字数
    numbers: { type: String },

    // 封面图
    img_url: { type: String },

    // 文章分类
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],

    // 创建日期
    create_time: { type: Date },

    // 最后修改日期
    update_time: { type: Date }
})

// 定义Model
const Article = mongoose.model('Article', articleSchema)

// 向外暴露articleModel
module.exports = Article