import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailiability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

// Routing
const router = Router()
/** 
* @swagger
* components:
*  schemas:
*     Product:
*        type: object
*        properties:
*           id:
*              type: integer
*              description: The Product ID
*              example: 1
*           name:
*              type: string
*              description: The Product name
*              example: Monitor Curvo de 49 Pulgadas
*           price:
*              type: number
*              description: The Product price
*              example: 300
*           availability:
*              type: boolean
*              description: The Product availability
*              example: true
*/

/** 
 * @swagger
 * /api/products:
 *    get:
 *       summary: Get a list of products
 *       tags: 
 *          - Products
 *       description: Return a list of products
 *       responses: 
 *          200:
 *             description: Successful response
 *             content:
 *                application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Product'
 * 
  */

// -- Obtener todos los Productos -- //
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *       summary: Get a product by ID
 *       tags: 
 *          - Products
 *       description: Return a product base on its unique ID
 *       parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *             type: integer
 *       responses:
 *          200:
 *             description: Successful Response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *             description: Not found
 *          400:
 *             description: Bad Request - Invalid ID
 * 
 */

// -- Obtener un producto por ID -- //
router.get('/:id', 
   
   // Validacion
   param('id').isInt().withMessage('ID No valido'),
   handleInputErrors,
   getProductById)
 
/**
 * @swagger
 * /api/products:
 *    post:
 *       summary: Creates a new product
 *       tags: 
 *          - Products
 *       description: Returns a new record in the database
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: "Monitor Curvo 49 Pulgadas"
 *                      price:  
 *                         type: number
 *                         example: 399    
 *       responses:
 *          201: 
   *           description: Successful response
   *           content:
   *              application/json:
   *                 schema:
   *                    $ref: '#/components/schemas/Product'
 *          400:
 *             description: Bad Request - invalid input data
 * 
 */

// -- Registrar un producto -- //
 router.post('/', 

    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('El precio debe ser Numerico')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),
   handleInputErrors,     
   createProduct)
 
/**
 * @swagger
 *    /api/products/{id}:
 *       put:
 *          summary: Updates a product with user input
 *          tags:
 *             - Products
 *          description: Returns the updated product
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                 type: integer
 *          requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         name:
 *                            type: string
 *                            example: "Monitor Curvo 49 pulgadas"
 *                         price:
 *                            type: number
 *                            example: 399
 *                         availability:
 *                            type: boolean
 *                            example: true
 *          responses:
 *             200:
 *                 description: Successfull response
 *                 content:
 *                     application/json:
 *                             schema:
 *                                 $ref: "#/components/schemas/Product"
 *             400:
 *                 description: Bad Request - Invalid ID or Invalid input data
 *             404:
 *                 description: Product Not Found
 */

// -- Editar un Producto -- //
 router.put('/:id', 
   // Validacion
   param('id').isInt().withMessage('ID No valido'),
   body('name')
      .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

   body('price')
      .isNumeric().withMessage('El precio debe ser Numerico')
      .notEmpty().withMessage('El precio de Producto no puede ir vacio')
      .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),

   body('availability')
      .isBoolean().withMessage('valor para disponibilidad no valido'),
   handleInputErrors,   
   updateProduct)
 
/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *       summary: Update Product availability
 *       tags:
 *          - Products
 *       description: Returns the updated availability
 *       parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema: 
 *               type: integer
 *       responses:
 *          200:
 *             description: Successful response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: "#/components/schemas/Product"
 *          400:
 *             description: Bad Request - Invalid ID
 *          404:
 *             description: Product Not Found
 */


// -- Editar un Producto (PATCH) -- //
 router.patch('/:id', 
   param('id').isInt().withMessage('ID No valido'),
   handleInputErrors,
   updateAvailiability)
 
/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *       summary: Deletes a Product by a given ID
 *       tags:
 *          - Products
 *       description: Returns a confirmation message
 *       parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema: 
 *               type: integer
 *       responses:
 *          200:
 *             description: Successful response
 *             content:
 *                application/json:
 *                   schema:
 *                      type: string
 *                      value: 'Producto Eliminado'
 *          400:
 *             description: Bad Request - Invalid ID
 *          404:
 *             description: Product Not Found
 */

 // -- Eliminar un Producto -- //
 router.delete('/:id', 
   param('id').isInt().withMessage('ID No valido'),
   handleInputErrors,
   deleteProduct)

 export default router