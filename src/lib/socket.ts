import { Server } from 'socket.io';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Handle new lead notifications
    socket.on('joinLeadRoom', () => {
      socket.join('leads');
      console.log(`Client ${socket.id} joined leads room`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Send welcome message
    socket.emit('connected', {
      message: 'Connected to CPA Lead Dashboard',
      timestamp: new Date().toISOString(),
    });
  });
};

// Global socket instance for real-time updates
declare global {
  var io: Server | undefined;
}