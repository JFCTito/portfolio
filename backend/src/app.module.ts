import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProjectModule,
    MongooseModule.forRoot(
      'mongodb+srv://portfolio:portfolio1234@clustertito.6d2esmg.mongodb.net/portfolio',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
