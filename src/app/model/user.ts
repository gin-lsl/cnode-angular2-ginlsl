import { Author } from './author';
import { Topic } from './topic';
import { Recent } from './recent';
export class User extends Author {
  public githubUsername: string;
  public create_at: Date;
  public score: number;
  public recent_topics?: Recent[];
  public recent_replies?: Recent[];
}
