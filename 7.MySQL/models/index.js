const Sequelize = require('sequelize');
// user.js와 comment.js에서 설정한 것들
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// mysql에 연결
const sequelize = new Sequelize(config.database, config.username, config.password,config);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

// 연결 객체를 init -> 테이블과 모델과 시퀄라이저를 연결
User.init(sequelize);
Comment.init(sequelize);

// 
User.associate(db);
Comment.associate(db);

module.exports = db;