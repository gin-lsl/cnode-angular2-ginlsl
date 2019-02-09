import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  /**
   * 用户访问token
   */
  private readonly access_token = '';

  /**
   * 请求api前缀
   */
  private readonly apiPrefix = 'https://cnodejs.org/api/v1';

  /**
   * 主题
   */

  /**
   * get /topics 主题首页
   * page number 页数
   * tab string 主题分类(ask, share, job, good)
   * limit number 每一页的主题数量
   * mdrender string 是否渲染出现的markdown格式, 默认为true
   */
  private readonly topics: string = '/topics';

  /**
   * get /topic/:id 主题详情
   * mdrender string
   * accesstoken 当需要知道一个主题是否被特定用户收藏时, 才需要此参数, 会影响返回值中的 is_collect 值
   */
  private readonly topic_detail: string = '/topic/';

  /**
   * post /topics 新建主题
   *
   */
  private readonly postNewTopic: string = '/topics';

  /**
   * post /topics/update 编辑主题
   */
  private readonly postTopicsUpdate: string = '/topics/update';

  /**
   * 主题收藏
   */

  /**
   * post /topic_collect/collect 收藏主题
   */
  private readonly postTopicCollectCollect: string = '/topic_collect/collect';

  private readonly postTopicCollectDeCollect: string = '/topic_collect/de_collect';

  private readonly topicCollectForLoginname: string = '/topic_collect/';

  /**
   * 评论
   */

  /**
   * 评论前半部分
   */
  private readonly postReplyForTopicId1: string = '/topic/';

  /**
   * 评论后半部分
   */
  private readonly postReplyForTopicId2: string = '/replies';

  /**
   * 为评论点赞 前半部分
   */
  private readonly replyUps1: string = '/reply/';

  /**
   * 为评论点赞 后半部分
   */
  private readonly replyUps2: string = '/ups';


  /**
   * 用户
   */

  private readonly userDetail: string = '/user/';

  private readonly userValid: string = '/accesstoken';

  /**
   * 通知 消息
   */

  private readonly messageCount: string = '/message/count';

  private readonly messages: string = '/messages';

  private readonly markAllToMessageReaded: string = '/message/mark_all';


  constructor() { }

  public getAccessToken() {
    return this.access_token;
  }

  public getTopics(): string {
    return this.apiPrefix + this.topics;
  }

  /**
   * GET https://cnodejs.org/api/v1/topic/
   *
   * 后面自行加个 :id
   */
  public getTopicDetail(): string {
    return this.apiPrefix + this.topic_detail;
  }

  /**
   * GET https://cnodejs.org/api/v1/user/
   *
   * 用户详情 后面加个 :loginname
   */
  public getUserDetail(): string {
    return this.apiPrefix + this.userDetail;
  }

  /**
   * POST https://cnodejs.org/api/v1/accesstoken
   * 
   * 验证accessToken的正确性
   *
   * 接受 post 参数
   *
   *  accesstoken string 用户的accessToken
   */
  public userValidAPI(): string {
    return this.apiPrefix + this.userValid;
  }

  /**
   * POST /topic_collect/collect 收藏主题
   * 
   * post 参数: 
   * 
   *    accesstoken string 用户的accessToken
   *    topic_id string 主题的id
   */
  public userDoFavoriteTopic(): string {
    return this.apiPrefix + this.postTopicCollectCollect;
  }

  /**
   * POST /topic_collect/de_collect 取消收藏
   * 
   *  接受 post 参数
   * 
   *    accesstoken string 用户的accessToken
   *    topic_id string 主题的id
   */
  public userDoDeFavoriteTopic(): string {
    return this.apiPrefix + this.postTopicCollectDeCollect;
  }

  /**
   * GET /topic_collect/:loginname 用户收藏的主题
   */
  public getTopicListForUserCollected(): string {
    return this.apiPrefix + this.topicCollectForLoginname;
  }

  /**
   * POST /topic/:topic_id/replies
   * 
   * 此方法的参数 topicId 就是返回路径中的参数 :topic_id
   * 
   * 接收 POST 参数
   * 
   *    accesstoken string 用户的 accessToken
   *    content string 评论的主体
   *    reply_id string 如果这个评论是对另一个评论的回复, 需要加上这个字段
   */
  public postReplyInTopic(topicId: string): string {
    return this.apiPrefix + this.postReplyForTopicId1 + topicId + this.postReplyForTopicId2;
  }

  /**
   * POST /reply/:reply_id/ups 为评论点赞
   * 
   *  接收的 POST 参数
   *    
   *    accesstoken string  
   * 
   * 接口会自动判断用户是否已经点赞。如果否，则点赞；如果是，则取消点赞。
   * 
   * 点赞还是取消点赞，会通过响应返回，在 action 字段中， up or down
   * 
   * @param replyId 点赞的评论 id 
   */
  public upOrDownReply(replyId: string): string {
    return this.apiPrefix + this.replyUps1 + replyId + this.replyUps2;
  }

  /**
   * GET /message/count 获取未读消息数
   * 
   *  接收 get 参数
   * 
   *    accesstoken string
   * 
   * 返回 => { data: 3 }
   */
  public getMessageCount(): string {
    return this.apiPrefix + this.messageCount;
  }

  /**
   * GET /messages 获取已读和未读消息
   * 
   * 接收 get 参数
   *    
   *    accesstoken string
   *    mdrender string 是否渲染markdown格式文本，默认为true
   */
  public getMessages(): string {
    return this.apiPrefix + this.messages;
  }

  /**
   * POST /message/mark_all 标记全部消息为已读
   * 
   * 接收 post 参数
   *    
   *    accesstoken string
   * 
   * 返回 => { success: true, marked_msgs: [ { id: 'xxxxxx' } ]}
   */
  public markAllMessageToReaded(): string {
    return this.apiPrefix + this.markAllToMessageReaded;
  }

}
