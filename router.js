const express = require("express");
const router = express.Router();
const service = require("./service.js");
//提供所有的图书信息
router.get("/books",service.allBooks);
//查询
router.get("/books/book/:id",service.getBookById);
//提交编辑后数据
router.put("/books/book",service.editBook);
//删除图书
router.delete("/books/book/:id",service.deleteBook);
//添加图书信息
router.post("/books/book",service.addBook);

module.exports = router;