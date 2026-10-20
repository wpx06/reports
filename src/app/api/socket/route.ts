import { NextResponse } from 'next/server';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { setupSocket } from '@/lib/socket';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: Request, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    
    setupSocket(io);
    
    // Store the io instance globally for use in API routes
    global.io = io;
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;