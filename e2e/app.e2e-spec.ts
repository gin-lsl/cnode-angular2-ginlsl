import { Ng2T2Page } from './app.po';

describe('ng2-t2 App', function() {
  let page: Ng2T2Page;

  beforeEach(() => {
    page = new Ng2T2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
