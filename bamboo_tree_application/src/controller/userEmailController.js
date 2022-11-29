const {database} = require('../config/connection');


exports.userEmailController =(req ,res ) =>{
let {email} = req.body;
database.table('get_news_updates')
.insert({
  user_email: email
})
.then(_successNum => {
      res.status(200).json({success: true});
  })
}
