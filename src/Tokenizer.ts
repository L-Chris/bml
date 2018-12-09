import Parser from './Parser';

let i = 0;
const TEXT = i++;
const BEFORE_TAG_NAME  = i++; // [
const AFTER_CLOSING_TAG_NAME = i++; // ]

class Tokenizer {
  private parser: Parser;
  private buffer: String;
  private state: number;
  private index: number;
  private sectionStart: number;

  private runing: Boolean;
  private ended: Boolean;

  constructor (options, parser) {
    this.parser = parser;
    this.buffer = '';
    this.state = TEXT;
    this.index = 0;
    this.runing = true;
    this.ended = false;
  }

  stateText(c) {
    if (c === '[') {
      this.state = BEFORE_TAG_NAME;
      this.sectionStart = this.index;
    }
  }

  stateBeforeTagName(c) {
    if (c === ']') {
      this.state = AFTER_CLOSING_TAG_NAME;
    } else if (c === '[') {
    }
  }

  stateAfterClosingTagName(c) {
    if (c === '>') {
      this.state = TEXT;
      this.sectionStart = this.index + 1;
    }
  }

  write(chunk) {
    if (this.ended) throw new Error('Already Done!')
    this.buffer += chunk;
    this.parse();
  }

  parse () {
    while (this.index < this.buffer.length && this.runing) {
      const c = this.buffer.charAt(this.index);

      switch (this.state) {
        case TEXT:
          this.stateText(c);
          break;
        case BEFORE_TAG_NAME:
          this.stateBeforeTagName(c);
          break;
        case AFTER_CLOSING_TAG_NAME:
          this.stateAfterTagName(c);
          break;
        default:
          break;
      }
    }
  }
}

export default Tokenizer