import { Author } from './author';

export class Topic {
  public id: string;
  public author_id: string;
  public tab: string;
  public content: string;
  public title: string;
  public last_reply_at: Date;
  public good: boolean;
  public top: boolean;
  public reply_count: number;
  public visit_count: number;
  public create_at: Date;
  public author: Author;
}
