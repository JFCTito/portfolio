import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface';
import { CreateProjectDTO } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.projectModel.find();
    return projects;
  }

  async findOne(id: string): Promise<Project> {
    const product = await this.projectModel.findById(id);
    return product;
  }

  async create(createProjectDTO: CreateProjectDTO): Promise<Project> {
    const project = new this.projectModel(createProjectDTO);
    return await project.save();
  }

  async delete(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id);
    return deletedProject;
  }

  async update(
    id: string,
    createProjectDTO: CreateProjectDTO,
  ): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      createProjectDTO,
      { new: true },
    );
    return updatedProject;
  }
}
