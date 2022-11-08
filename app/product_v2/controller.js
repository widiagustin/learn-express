const connection = require('../../config/sequelize')
const ProductModel = require('./model')
const fs = require('fs')
const path = require('path')

const index = async (req, res) => {
  try {
    const products = await ProductModel.findAll()
    res.status(200).json({
      data: products,
    })
  } catch (e) {
    res.status(500).json({
      data: 'Data tidak ditemukan'
    })
  }
}

const detail = async (req, res) => {
  try {
    const { id } = req.params
    const products = await ProductModel.findOne({ where: { id: id } })
    if (products) {
      res.status(200).json({
        data: products
      })
    } else {
      res.status(400).json({
        data: 'Data tidak ditemukan'
      })
    }
  } catch (e) {
    res.status(500).json({
      error: e
    })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params
    const products = await ProductModel.destroy({ where: { id: id } })
    if (products) {
      res.status(200).json({
        data: products
      })
    } else {
      res.status(400).json({
        data: 'Data tidak ditemukan'
      })
    }
  } catch (e) {
    res.status(500).json({
      error: e
    })
  }
}

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body
  const image = req.file
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname)
    fs.renameSync(image.path, target)
    try {
      const result = await ProductModel.create({
        users_id, name, price, stock, status, image_url: `http://localhost:3200/public/${image.originalname}`
      })
      res.status(200).json({
        data: result
      })
    } catch (e) {
      res.status(500).json({
        error: 'Data gagal disimpan'
      })
    }
  } else {
    try {
      const result = await ProductModel.create({
        users_id, name, price, stock, status
      })
      res.status(200).json({
        data: result,
      })
    } catch (e) {
      res.status(500).json({
        error: 'Data gagal disimpan'
      })
    }
  }
}

const update = async (req, res) => {
  const { id } = req.params
  try {
    const { users_id, name, price, stock, status } = req.body
    const image = req.file
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname)
      fs.renameSync(image.path, target)

      const result = await ProductModel.update({
        users_id, name, price, stock, status, image_url: `http://localhost:3200/public/${image.originalname}`
      }, { where: { id: id } })

      res.status(200).json({
        data: result,
        metadata: "data updated! 😋"
      })
    } else {
      const result = await ProductModel.update({
        users_id, name, price, stock, status
      }, { where: { id: id } })

      res.status(200).json({
        data: result,
        metadata: "data updated! 😋"
      })
    }
  } catch (e) {
    res.status(500).json({
      error: 'Data gagal disimpan'
    })
  }
}

module.exports = { index, detail, store, update, destroy }