import { Request, Response } from "express"
import Product from "../models/Product.model"

// Obtener todos los productos
export const getProducts = async(req: Request, res: Response) => {
    try {
        // Seleccionar todos los Productos
        const products =  await Product.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}
// Obtener un producto por ID
export const getProductById = async(req: Request, res: Response) => {
    try {
        // Encontrar el Producto a Seleccionar
       const { id } = req.params
       const product = await Product.findByPk(id)

       // Comprobar si existe
       if(!product) {
        res.status(404).json({error: "Producto No Encontrado"})
        return 
       }

       res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

// Crear un Producto
export const createProduct = async (req : Request, res : Response) => {
    try {
        // Registrar el nuevo Producto
        const product = await Product.create(req.body)
        res.status(201).json({data: product})

    } catch (error) {
        console.log(error)
    }
}

// Editar un producto (PUT)
export const updateProduct = async (req : Request, res : Response) => {
 
    // Encontrar el Producto a Actualizar
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Comprobar si existe
    if(!product) {
     res.status(404).json({error: "Producto No Encontrado"})
     return 
    }

    // Actualizar Producto
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

// Editar un producto (PATCH)
export const updateAvailiability = async (req : Request, res : Response) => {
 
    // Encontrar el Producto a Actualizar
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Comprobar si existe
    if(!product) {
     res.status(404).json({error: "Producto No Encontrado"})
     return 
    }

    // Actualizar Producto
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data: product})
}

// Eliminar un producto
export const deleteProduct = async (req : Request, res : Response) => {
 
    // Encontrar el Producto a Actualizar
    const { id } = req.params
    const product = await Product.findByPk(id)

    // Comprobar si existe
    if(!product) {
        res.status(404).json({error: "Producto No Encontrado"})
        return 
       }

    // Eliminar producto
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
   
 }