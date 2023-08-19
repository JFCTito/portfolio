import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/project.dto';

const projects: CreateProjectDTO[] = [
  {
    name: 'project 1',
    description: 'project 1 description',
    img: 'project image',
    tech: 'html',
    category: 'front or back',
    url: 'project url',
    github: 'project github',
  },
  {
    name: 'project 2',
    description: 'project 2 description',
    img: 'project image',
    tech: 'css',
    category: 'back',
    url: 'project url',
    github: 'project github',
  },
];

describe('ProjectService', () => {
  let service: ProjectService;
  const mockProjectRepositoryService = {
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
    update: jest.fn().mockImplementation((name, updatedData) => {
      const foundIndex: any = projects.find((project) => project.name === name);
      const updatedProject = {
        ...projects[foundIndex],
        ...updatedData,
      };
      projects[foundIndex] = updatedProject;
      return Promise.resolve(updatedProject);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    })
      .overrideProvider(ProjectService)
      .useValue(mockProjectRepositoryService)
      .compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a project list', async () => {
    expect(await service.findAll()).toMatchObject({ projects });
  });

  it('should create a project and return the project created', async () => {
    const newProject = {
      name: 'project 2',
      description: 'project 2 description',
      img: 'project image',
      tech: 'html',
      category: 'front',
      url: 'project url',
      github: 'project github',
    };
    expect(await service.create(newProject)).toMatchObject({
      id: expect.any(Number),
    });
  });

  it('should return an specific project', async () => {
    expect(await service.findOne('project 1')).toMatchObject({
      name: 'project 1',
      description: 'project 1 description',
      img: 'project image',
      tech: 'html',
      category: 'front or back',
      url: 'project url',
      github: 'project github',
    });
  });

  it('should update a project and return the project updated', async () => {
    const updatedProject = {
      name: 'project 2 updated',
      description: 'project 2 description updated',
      img: 'project image updated',
      tech: 'tech updated',
      category: 'front',
      url: 'project url',
      github: 'project github',
    };
    expect(await service.update('project 2', updatedProject)).toMatchObject(
      updatedProject,
    );
  });
});
