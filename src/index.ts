import Tokenizer from './Tokenizer'
import Parser from './Parser'
import Generator from './Generator'

function run (input) {
  const stream = new Tokenizer(input)
  const ast = new Parser(stream)
  const output = new Generator(ast)
  return output
}

export {
  Tokenizer,
  Parser,
  Generator
}