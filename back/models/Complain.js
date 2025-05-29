// models/complain.js
module.exports = (sequelize, DataTypes) => {
    const Complain = sequelize.define('Complain', {
        targetType: {
            type: DataTypes.INTEGER, // 1 = 유저, 2 = 게시글, 3 = 댓글
            allowNull: false,
        },
        targetId: {
            type: DataTypes.INTEGER, // 실제 Comment.id, User.id, Post.id
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER, // 신고한 사람
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING(255), // 선택사항: 신고 사유
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Complain.associate = (db) => {
        Complain.belongsTo(db.User, { foreignKey: 'userId', as: 'Reporter' }); // 신고자
    };

    return Complain;
};
