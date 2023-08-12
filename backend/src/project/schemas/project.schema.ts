import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  name: String,
  description: String,
  img: String,
  category: String,
});
