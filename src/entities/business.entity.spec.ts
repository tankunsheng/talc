import { Business } from './business.entity';

describe('Business', () => {
  it('should be defined', () => {
    expect(new Business()).toBeDefined();
  });
});
