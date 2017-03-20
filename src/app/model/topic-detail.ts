import { Topic } from './topic';
import { Reply } from './reply';
export class TopicDetail extends Topic {
  public replies: Reply[];
  public is_collect: boolean;
}
