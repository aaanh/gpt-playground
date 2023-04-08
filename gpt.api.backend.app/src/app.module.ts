import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { QnaModule } from './qna/qna.module';
import { DalleModule } from './dalle/dalle.module';

@Module({
  imports: [ChatModule, QnaModule, DalleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
