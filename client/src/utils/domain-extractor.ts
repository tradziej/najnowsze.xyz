class DomainExtractor {
  link: string;

  constructor(link: string) {
    this.link = link;
  }

  getDomain(): string {
    const matches = this.link.match(
      /^https?:\/\/(?:www\.)?([^/?#]+)(?:[/?#]|$)/i
    );
    if (!matches) {
      return '';
    }

    return matches![1];
  }
}

export default DomainExtractor;
