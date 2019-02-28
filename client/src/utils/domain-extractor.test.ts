import DomainExtractor from './domain-extractor';

describe('DomainExtractor', () => {
  let extractor: DomainExtractor;

  describe('getDomain', () => {
    test('simple case', () => {
      const link = 'http://tomasz.xyz/blog/post';
      extractor = new DomainExtractor(link);
      expect(extractor.getDomain()).toEqual('tomasz.xyz');
    });

    test('empty link', () => {
      const link = '';
      extractor = new DomainExtractor(link);
      expect(extractor.getDomain()).toEqual('');
    });

    test('link to www subdomain', () => {
      const link = 'http://www.tomasz.xyz/blog/post';
      extractor = new DomainExtractor(link);
      expect(extractor.getDomain()).toEqual('tomasz.xyz');
    });

    test('test nested subdomains', () => {
      const link = 'http://www.this.is.my.blog.tomasz.xyz/blog/post';
      extractor = new DomainExtractor(link);
      expect(extractor.getDomain()).toEqual('this.is.my.blog.tomasz.xyz');
    });
  });
});
