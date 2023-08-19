import { Document } from 'mongoose';

export interface Project extends Document {
  readonly name: string;
  readonly description: string;
  readonly img: String;
  readonly tech: String;
  readonly category: String;
  readonly url: string;
  readonly github: string;
}
