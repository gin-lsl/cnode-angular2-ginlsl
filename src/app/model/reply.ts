import { Author } from './author';
export class Reply {
  public id: string;
  public author: Author;
  public content: string;
  public ups: any;
  public create_at: Date;
  public reply_id?: string;
}
