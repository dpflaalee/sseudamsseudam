module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        type: {
            type: DataTypes.STRING(255),
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
    };
    return Notification;
};

