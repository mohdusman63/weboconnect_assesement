require('dotenv').config(); 
const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../.env') });
//console.log("process.env", process.env)
const moment=require('moment')
module.exports = {
  
  'production': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host':     process.env.DB_HOST,
    'dialect': 'mysql',
    'logging':  false
    
  },
  'test': {
    'username': 'root',
    'password': '',
    'database': 'Tenant_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'development': {
   'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host':     process.env.DB_HOST,
    'dialect': 'mysql',
   
   
  }
  
  
};
