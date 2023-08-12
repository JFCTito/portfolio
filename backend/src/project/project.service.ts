import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  async findAll(): Promise<any> {
    return 'soy project service';
  }

  create(project: any) {
    return 'post del project';
  }
}
