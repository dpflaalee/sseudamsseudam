module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        senderAniId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverAniId: {
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
    });

    Notification.associate = (db) => {
        Notification.belongsTo(db.User, { foreignKey: 'senderId', as: 'Sender' });
        Notification.belongsTo(db.User, { foreignKey: 'receiverId', as: 'Receiver' });
        Notification.belongsTo(db.Animal, { foreignKey: 'senderAniId', as: 'SenderAnimal' });
        Notification.belongsTo(db.Animal, { foreignKey: 'receiverAniId', as: 'ReceiverAnimal' });
    };

    return Notification;
};
