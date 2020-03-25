import { Token, KeywordDescTable } from '../token';

export function convertTokenType(parser: any, t: Token): any {
  switch (t) {
    case Token.NumericLiteral:
      parser.onToken('NumericLiteral', parser.tokenValue, false);
      break;
    case Token.StringLiteral:
      parser.onToken('StringLiteral', parser.tokenValue, false);
      break;
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      parser.onToken('BooleanLiteral', KeywordDescTable[t & Token.Kind] === 'true', false);
      break;
    case Token.NullKeyword:
      parser.onToken('NullLiteral', null, false);
      break;
    case Token.RegularExpression:
      parser.onToken(
        'RegularExpression',
        {
          value: parser.tokenValue,
          regex: parser.tokenRegExp
        },
        false
      );
      break;
    case Token.TemplateCont:
    case Token.TemplateTail:
      parser.onToken('TemplateLiteral', parser.tokenValue, false);
      break;
    default:
      if ((t & Token.IsIdentifier) === Token.IsIdentifier) {
        parser.onToken('Identifier', parser.tokenValue, false);
      }

      if ((t & Token.Keyword) === Token.Keyword) parser.onToken('Keyword', parser.tokenValue, false);

      parser.onToken('Punctuator', KeywordDescTable[t & Token.Kind], false);
      break;
  }
}
