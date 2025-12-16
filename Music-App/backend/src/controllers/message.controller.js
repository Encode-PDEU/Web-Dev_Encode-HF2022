const Message = require("../models/message.model");

const User = require("../models/user.model");

// Send a message
const sendMessage = async (req, res, next) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.auth.userId;
        
        if (!receiverId || !content || content.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Receiver ID and content are required'
            });
        }
        
        // 1. Save message
        const message = new Message({
            senderId: senderId,
            receiverId: receiverId,
            content: content.trim(),
            read: false
        });
        await message.save();
        
        // 2. Get sender info
        const sender = await User.findOne({ clerkId: senderId });
        
        // 3. Create notification for receiver
        const notification = new Notification({
            userId: receiverId,
            type: 'message',
            senderId: senderId,
            senderName: sender?.fullName || 'Unknown',
            messageContent: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
            messageId: message._id
        });
        await notification.save();
        
        // 4. Get Socket.io instance if available
        const io = req.app.get('io');
        if (io) {
            // Send notification to receiver in real-time
            io.to(`user:${receiverId}`).emit('notification:new', {
                _id: notification._id,
                type: 'message',
                senderId: senderId,
                senderName: sender?.fullName || 'Unknown',
                messageContent: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
                createdAt: notification.createdAt,
                read: false
            });
            
            // Update notification count
            const unreadCount = await Notification.getUnreadCount(receiverId);
            io.to(`user:${receiverId}`).emit('notification:count', {
                notifications: unreadCount
            });
        }
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: message,
            notification: notification
        });
        
    } catch (error) {
        next(error);
    }
};

// Get messages between users (your existing function)
const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: myId },
                { senderId: myId, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });

        // Mark messages as read when fetching
        await Message.updateMany(
            {
                senderId: userId,
                receiverId: myId,
                read: false
            },
            {
                read: true,
                readAt: new Date()
            }
        );

        res.status(200).json({
            success: true,
            messages: messages
        });
    } catch (err) {
        next(err);
    }
};

// Get unread message count
const getUnreadCount = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const count = await Message.getUnreadCount(userId);
        
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getUnreadCount
};