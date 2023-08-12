import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  // Obtener todos los projects
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  // Crear un project
  @Post()
  create(@Body() project: any) {
    return this.projectService.create(project);
  }
}
