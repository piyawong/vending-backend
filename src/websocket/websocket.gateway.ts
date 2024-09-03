import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';

interface VideoFolder {
  name: string;
  videos: string[];
}

interface UploadChunk {
  folderName: string;
  fileName: string;
  data: ArrayBuffer;
  offset: number;
  total: number;
}

@WebSocketGateway({
  cors: true,
  path: '/websocket',
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly baseUploadPath = path.join(__dirname, '..', '..', 'uploads');

  onModuleInit() {
    this.initializeFolders();
  }

  private initializeFolders() {
    this.videoFolders.forEach((folder) => {
      const folderPath = path.join(this.baseUploadPath, folder.name);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      const files = fs.readdirSync(folderPath);
      folder.videos = files.filter((file) => file.endsWith('.mp4'));
    });
  }

  @WebSocketServer() server: Server;
  private videoFolders: VideoFolder[] = [
    { name: 'default', videos: [] },
    { name: 'gen-z-male', videos: [] },
    { name: 'millennials-male', videos: [] },
    { name: 'gen-x-male', videos: [] },
    { name: 'boomers-male', videos: [] },
    { name: 'gen-z-female', videos: [] },
    { name: 'millennials-female', videos: [] },
    { name: 'gen-x-female', videos: [] },
    { name: 'boomers-female', videos: [] },
  ];
  private uploadBuffers: Map<string, Buffer> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('video-list-updated', this.videoFolders);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('request_video_list')
  handleRequestVideoList(client: Socket): void {
    this.updateVideoList();
    client.emit('video-list-updated', this.videoFolders);
  }

  private updateVideoList() {
    this.videoFolders.forEach((folder) => {
      const folderPath = path.join(this.baseUploadPath, folder.name);
      console.log(`Checking folder: ${folderPath}`);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        folder.videos = files
          .filter((file) => {
            const filePath = path.join(folderPath, file);
            console.log(`Checking file: ${filePath}`);
            return file.endsWith('.mp4') && fs.existsSync(filePath);
          })
          .map((file) => {
            const videoPath = `/uploads/${folder.name}/${encodeURIComponent(file)}`;
            console.log(`Added video path: ${videoPath}`);
            return videoPath;
          });
      } else {
        console.log(`Folder does not exist: ${folderPath}`);
        folder.videos = [];
      }
    });
    console.log(
      'Updated video list:',
      JSON.stringify(this.videoFolders, null, 2),
    );
  }
  @SubscribeMessage('selected_videos')
  handleSelectedVideos(client: Socket, payload: string[]): void {
    console.log(`Received selected videos from ${client.id}: ${payload}`);
    this.server.emit('selected_videos_updated', payload);
  }

  @SubscribeMessage('upload_video_chunk')
  handleVideoChunkUpload(client: Socket, payload: UploadChunk): void {
    const { folderName, fileName, data, offset, total } = payload;
    const fileId = `${folderName}/${fileName}`;

    if (!this.uploadBuffers.has(fileId)) {
      this.uploadBuffers.set(fileId, Buffer.alloc(total));
    }

    const fileBuffer = this.uploadBuffers.get(fileId);
    const chunk = Buffer.from(data);
    chunk.copy(fileBuffer, offset);

    client.emit('upload_chunk_response', { success: true });
  }

  @SubscribeMessage('upload_video_complete')
  handleVideoUploadComplete(
    client: Socket,
    payload: { folderName: string; fileName: string },
  ): void {
    const { folderName, fileName } = payload;
    console.log('upload_video_complete', payload);
    const fileId = `${folderName}/${fileName}`;
    const fileBuffer = this.uploadBuffers.get(fileId);

    if (fileBuffer) {
      const folderPath = path.join(this.baseUploadPath, folderName);
      console.log('folderPath', folderPath);
      const filePath = path.join(folderPath, fileName);

      fs.writeFileSync(filePath, fileBuffer);

      this.updateVideoList();
      this.server.emit('current-video-list', this.videoFolders);
      // this.server.emit('video-list-updated', this.videoFolders);

      this.uploadBuffers.delete(fileId);
      console.log(`Video uploaded: ${fileName} in ${folderName}`);
    }
  }

  @SubscribeMessage('current_video_list')
  handleCurrentVideoList(): void {
    this.server.emit('current-video-list', this.videoFolders);
  }
  @SubscribeMessage('sync_video_list')
  handleSyncVideoList(client: Socket, payload: string[]): void {
    console.log(`Received selected videos from ${client.id}: ${payload}`);
    this.server.emit('video-list-updated', this.videoFolders);
  }
}
