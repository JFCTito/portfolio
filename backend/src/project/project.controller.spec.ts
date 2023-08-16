import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/project.dto';

const projects: CreateProjectDTO[] = [
  {
    name: 'project 1',
    description: 'project 1 description',
    img: 'project image',
    tech: 'html',
    category: 'front or back',
  },
  {
    name: 'project 2',
    description: 'project 2',
    img: 'project image',
    tech: 'css',
    category: 'back',
  },
];

describe('ProjectController', () => {
  let controller: ProjectController;
  const mockProjectService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({ projects })),
    create: jest.fn().mockImplementation((project) => {
      const newProject = {
        id: 2,
        ...project,
      };
      projects.push(newProject);
      return Promise.resolve(newProject);
    }),
    findOne: jest.fn().mockImplementation((name) => {
      const foundProject = projects.find((project) => project.name === name);
      return Promise.resolve(foundProject);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService],
    })
      .overrideProvider(ProjectService)
      .useValue(mockProjectService)
      .compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a project list', async () => {
    expect(await controller.findAll()).toMatchObject({ projects });
  });

  it('should create a project and return the project created', async () => {
    const newProject = {
      name: 'project 2',
      description: 'project 2 description',
      img: 'project image',
      tech: 'html',
      category: 'front',
    };
    expect(await controller.create(newProject)).toMatchObject({
      id: expect.any(Number),
    });
  });

  it('should return an specific project', async () => {
    expect(await controller.findOne('project 1')).toMatchObject({
      name: 'project 1',
      description: 'project 1 description',
      img: 'project image',
      tech: 'html',
      category: 'front or back',
    });
  });
});
