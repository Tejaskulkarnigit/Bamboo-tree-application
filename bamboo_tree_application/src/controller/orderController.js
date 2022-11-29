const {database} = require('../config/connection');

exports.OrderController =(req ,res ) =>{
    database.table('order_details as od')
    .join([
        {
            table: 'orders as o',
            on: 'o.id = od.order_id'
        },
        {
            table: 'product_trees as p',
            on: 'p.id = od.product_tree_id'
        },
        {
            table: 'user as u',
            on: 'u.id = o.user_id'
        }
    ])
    .withFields(['o.id', 'p.tree_name', 'p.tree_name', 'p.price','p.tree_image_path', 'u.name'])
    .getAll()
    .then(orders => {
        if (orders.length > 0) {
            res.json(orders);
        } else {
            res.json({message: "No orders found"});
        }

    }).catch(err => res.json(err));
}


exports.singleOrderController =(req ,res ) =>{
let orderId = req.params.id;
    console.log(orderId);

    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'product_trees as p',
                on: 'p.id = od.product_tree_id'
            },
            {
                table: 'user as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.tree_name', 'p.tree_info', 'p.price', 'p.tree_image_path', 'od.quantity as quantityOrdered', 'u.name'])
        .filter({'o.id': orderId})
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
}

exports.OrderDetailsController =(req ,res ) =>{
    let {userId, products} = req.body;
    console.log(userId);
    console.log(Object.values(products[0])[1]);



     if (userId !== null && userId > 0) {
        database.table('orders')
            .insert({
                user_id: userId
            }).then(async (newOrderId) => {

                console.log("newOrderId",newOrderId.insertId)

            if (newOrderId.insertId) {
                console.log("test0")
                
               // product_trees.forEach(async (p) => {
                    console.log("test1")

                        let data = await database.table('product_trees')
                        .filter({id:Object.values(products[0])[0]})
                        .withFields(['stock_quantity'])
                        .getAll();


                    console.log("data",Object.values(data )[0])


                    let inCart = parseInt(Object.values(products[0])[1]);


                    console.log("inCart",inCart)


                    // Deduct the number of pieces ordered from the quantity in database

                    if (Object.values(data )[0].stock_quantity > 0) {
                        Object.values(data )[0].stock_quantity = Object.values(data )[0].stock_quantity - inCart;

                        if (Object.values(data )[0].stock_quantity < 0) {
                            Object.values(data )[0].stock_quantity = 0;
                        }

                    } else {
                      //  data.stock_quantity = 0;
                    }
                     console.log("stock",Object.values(data )[0].stock_quantity);
                     

                    // Insert order details w.r.t the newly created order Id
                    database.table('order_details')
                        .insert({

                            product_tree_id: Object.values(products[0])[0],

                            order_id: newOrderId.insertId,
                            
                            quantity: inCart
                        }).then(_newId => {
                        database.table('product_trees')
                            .filter({id: Object.values(products[0])[0]})
                            .update({
                                stock_quantity: Object.values(data )[0].stock_quantity
                            }).then(_successNum => {
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
    // });

            
            } else {
               return res.json({message: 'New order failed while adding order details', success: false});
            }
             return res.json({
                message: `Order successfully placed with order id ${newOrderId.insertId}`,
                success: true,
                //order_id: newOrderId.insertId,
                //products: product_tree_id,
                
            })
        }).catch(err => res.json(err));
    }

    else {
       return res.json({message: 'New order failed', success: false});
    }

}

