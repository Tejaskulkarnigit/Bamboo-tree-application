const {database} = require('../config/connection');


exports.productController =(req ,res ) =>{

    //let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    //const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;  
    //let startValue;
    //let endValue;
    //if (page > 0) {
    //    startValue = (page * limit) - limit;     
    //    endValue = page * limit;                  
    //} else {
    //    startValue = 0;
    //    endValue = 10;
    // }
    database.table('product_trees as p')
        .join([
            {
                table: "filter_categories as c",
                on: `c.id = p.categories_id`
            },
            {
                table: "filter_trees_type as t",
                on: `t.id = p.tree_type_id`
            }
        ])
        .withFields(['c.category_title as filter_categories',
            'p. tree_name as name',
            'p.tree_type_id',
            'p.price',
            'p.stock_quantity',
            'p.tree_info',
            'p.tree_image_path',
            'p.id'
        ])
        //.slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No products found"});
            }
        })
        .catch(err => console.log(err));
}

exports.prodIdController=(req,res)=>{

    let productId = req.params.prodId;
    database.table('product_trees as p')
        .join([
            {
                table: "filter_categories as c",
                on: `c.id = p.categories_id`
            },
            {
                table: "filter_trees_type as t",
                on: `t.id = p.tree_type_id`
            }
        ])
        .withFields(['c.category_title as filter_categories',
            'p. tree_name as name',
            'p.tree_type_id',
            'p.price',
            'p.stock_quantity',
            'p.tree_info',
            'p.tree_image_path',
            'p.id'
        ])
        .filter({'p.id': productId})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
}


exports.treetypeController=(req,res)=>{

let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   
//const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   
//let startValue;
//let endValue;
//if (page > 0) {
 //   startValue = (page * limit) - limit;      
//    endValue = page * limit;                  
//} else {
    startValue = 0;
//    endValue = 10;
//}

// Get tree-type title value from param
const tree_type_name = req.params.typeName;

database.table('product_trees as p')
    .join([
        {
            table: "filter_categories as c",
            on: `c.id = p.categories_id `
        },
        {
            table: "filter_trees_type as t",
            on: `t.id = p.tree_type_id WHERE t.tree_type_name LIKE '%${tree_type_name}%'`
        }
       
    ])
    .withFields(['c.category_title as filter_categories',
        'p. tree_name as name',
        'p.tree_type_id',
        'p.price',
        'p.stock_quantity',
        'p.tree_info',
        'p.tree_image_path',
        'p.id'
    ])
    //.slice(startValue, endValue)
    .sort({id: 1})
    .getAll()
    .then(prods => {
        if (prods.length > 0) {
            res.status(200).json({
                count: prods.length,
                products: prods
            });
        } else {
            res.json({message: `No products found matching the tree_type ${tree_type_name}`});
        }
    }).catch(err => res.json(err))
}


exports.categoryController=(req,res)=>{
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   
    //const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   
    //let startValue;
    //let endValue;
    //if (page > 0) {
    //    startValue = (page * limit) - limit;      
    //    endValue = page * limit;                  
    //} else {
        startValue = 0;
    //    endValue = 10;
    //}

    // Get category title value from param
    const category_title= req.params.catName;

    database.table('product_trees as p')
        .join([
            {
                table: "filter_categories as c",
                on: `c.id = p.categories_id WHERE c.category_title LIKE '%${category_title}%'`
            },
           // {
            //    table:"filter_trees_type as t",
            //    on: `t.id = p.tree_type_id`
           // }
            
        ])
        .withFields(['c.category_title as filter_categories',
            'p. tree_name as name',
            'p.tree_type_id',
            'p.price',
            'p.stock_quantity',
            'p.tree_info',
            'p.tree_image_path',
            'p.id'
        ])
        //.slice(startValue, endValue)
        .sort({id: 1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${category_title}`});
            }
        }).catch(err => res.json(err));

}


exports.oneTreeCategoryController=(req,res)=>{
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   
    //const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   
    //let startValue;
    //let endValue;
    //if (page > 0) {
    //    startValue = (page * limit) - limit;      
    //    endValue = page * limit;                 
    //} else {
        startValue = 0;
    //    endValue = 10;
    //}

    // Get category title value from param
    const category_title = req.params.catName;
    const tree_type_name=req.params.typeName;
    


    database.table('product_trees as p')
        .join([
            {   
                table: "filter_categories as c",
                on: `c.id = p.categories_id `
                
                
            },
            {
                table: "filter_trees_type as t",
                on: `t.id = p.tree_type_id WHERE t.tree_type_name LIKE '%${tree_type_name}%'`
            }
           
        ])
        .withFields(['c.category_title as filter_categories',
            'p. tree_name as name',
            'p.tree_type_id',
            'p.price',
            'p.stock_quantity',
            'p.tree_info',
            'p.tree_image_path',
            'p.id',
            'p.categories_id'
        ])
        //.slice(startValue, endValue)
        .sort({id: 1})
        .getAll()
        .then(prods => {
            console.log(prods)
            const temp=[]
            for(let i=0;prods.length>i ;i++ )
            {
                console.log(prods[i].filter_categories,category_title)
              if(prods[i].filter_categories==category_title)
              {
                temp.push(prods[i])
              }
            }
            console.log(temp)
            if (temp.length > 0) {
                res.status(200).json({
                    count: temp.length,
                    products: temp,
                });
            } else {
                res.json({message: `No products found matching the category ${category_title}, ${tree_type_name}`});
            }
        }).catch(err => res.json(err));

}


exports.priceController=(req,res)=>{
let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   
   // const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   
    //let startValue;
    //let endValue;
    //if (page > 0) {
    //    startValue = (page * limit) - limit;     
    //    endValue = page * limit;                  
    //} else {
        startValue = 0;
    //    endValue = 10;
    //}

    // Get category title value from param
    const category_title = req.params.catName;
    const tree_type_name =req.params.typeName;
    const Lprice=req.params.Lprice;
    const Uprice=req.params.Uprice;
    


    database.table('product_trees as p')
        .join([
            {
                table: "filter_categories as c",
                on: `c.id = p.categories_id `
            },
            {
                table: "filter_trees_type as t",
                on: `t.id = p.tree_type_id WHERE t.tree_type_name LIKE '%${tree_type_name}%'`
            }
           
           
           
        ])
        .withFields(['c.category_title as filter_categories',
            'p. tree_name as name',
            'p.tree_type_id',
            'p.price',
            'p.stock_quantity',
            'p.tree_info',
            'p.tree_image_path',
            'p.id'
        ])
        //.slice(startValue, endValue)
        .sort({id: 1})
        .getAll()
        .then(prods => {
            const temp=[]
            for(let i=0;prods.length>i ;i++ )
            {
                //console.log(prods[i].filter_categories,category_title)
                console.log(Lprice,prods[i].price,Uprice)
              if(prods[i].filter_categories==category_title && Lprice<=prods[i].price && prods[i].price<=Uprice) 
              {
                temp.push(prods[i])
              }
            }
            console.log(temp)
            if (temp.length > 0) {
                res.status(200).json({
                    count: temp.length,
                    products: temp,
                });
            } else {
                res.json({message: `No products found matching the category ${Lprice}`});
            }
        }).catch(err => res.json(err));

}


