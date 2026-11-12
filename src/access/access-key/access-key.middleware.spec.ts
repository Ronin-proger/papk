import { AccessKeyMiddleware } from './access-key.middleware';

describe('AccessKeyMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessKeyMiddleware()).toBeDefined();
  });
});
