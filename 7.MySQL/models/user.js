const Sequelize = require('sequelize');

// class 모델이름 extends Sequelize.Model
module.exports = class user extends Sequelize.Model {
    //
    static init(sequelize){
        return super.init({
            // 기본 형태
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.COmment, {foreignKey: 'commenter', sourceKey:'id'});
    }
}