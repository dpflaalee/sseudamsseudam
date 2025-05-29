// models/Notification.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        targetId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    });

    Notification.associate = (db) => {
        Notification.belongsTo(db.User, { foreignKey: 'senderId', as: 'Sender' });
        Notification.belongsTo(db.User, { foreignKey: 'receiverId', as: 'Receiver' });

        // ✅ GroupApplyResult와 1:1 관계 설정
        Notification.hasOne(db.GroupApplyResult, {
            foreignKey: 'notificationId',
            sourceKey: 'id',
            onDelete: 'CASCADE',
        });
    };

    return Notification;
};
