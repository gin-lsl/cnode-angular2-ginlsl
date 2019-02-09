import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable()
export class UserAuthService {

  private readonly ACCESS_TOKEN_KEY = 'accesstoken';

  private accessToken: string;

  private validationUri: string;

  constructor(
    private _configService: ConfigService,
  ) {
    this.validationUri = _configService.userValidAPI();
  }

  public validationUser() {

  }

  /**
   * 从 localStorage 中刷新 accessToken
   * 
   * 依赖于 this.checkHasLocalStorageOrNot() 返回的结果
   * 
   * 返回是否刷新成功
   */
  public flushAccessTokenFromLocalStorage(): boolean {
    let _at = this.checkHasLocalStorageOrNot();
    if (this.checkHasLocalStorageOrNot() == null) {
      return false;
    }
    this.accessToken = _at;
    return true;
  }

  /**
   * 检查本地 localStorage 中是否存储有 accessToken
   * 
   * 返回检查结果, 如果有, 直接返回; 如果没有, 则返回null
   */
  public checkHasLocalStorageOrNot(): string {
    return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * 将 accessToken 重置为空
   * 
   * 包括 localStorage 中和这个 service 中的变量
   */
  public resetAccessToken() {
    window.localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.accessToken = null;
  }

  /**
   * 将 accessToken 保存到本地
   * 
   * @param val accessToken
   */
  public setAccessTokenToLocalStorage(val: string) {
    window.localStorage.setItem(this.ACCESS_TOKEN_KEY, val);
  }

}
