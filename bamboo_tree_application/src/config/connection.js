const MySqli = require ('mysqli');

let conn = new MySqli({
    Host: 'localhost', // IP/domain name 
    post: 3306, // port, default 3306 
    user: 'root', // username 
    passwd: '', // password 
    db: 'bamboo_tree_application'
});

let db = conn.emit(false,'');

module.exports ={
    database:db
};
