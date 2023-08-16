import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  // Obtener todos los projects
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  // obtener un project
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }
  // Crear un project
  @Post()
  async create(/* @Res() res, */ @Body() createProjectDTO: CreateProjectDTO) {
    // const project = await this.projectService.create(createProjectDTO);
    // return res.status(HttpStatus.OK).json({
    //   message: 'Project created successfully',
    //   project: project,
    // });
    return await this.projectService.create(createProjectDTO);
  }
  // eliminar un projecto
  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    const deletedProject = this.projectService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Project deleted successfully',
      deletedProject,
    });
  }
  // actualizar un projecto
  @Put(':id')
  async update(
    /* @Res() res, */
    @Param('id') id: string,
    @Body() createProjectDTO: CreateProjectDTO,
  ) {
    const updatedProject = await this.projectService.update(
      id,
      createProjectDTO,
    );
    if (!updatedProject) throw new NotFoundException('Project not found');
    // return res.status(HttpStatus.OK).json({
    //   message: 'Project updated successfully',
    //   updatedProject,
    // });
    return updatedProject;
  }
}
