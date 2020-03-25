import { Token, KeywordDescTable } from '../token';

export function convertTokenType(parser: any, t: Token): any {
  if ((t & Token.IsIdentifier) === Token.IsIdentifier)
    return {
      type: 'Identifier',
      value: parser.tokenValue
    };

  if ((t & Token.Keyword) === Token.Keyword)
    return {
      type: 'Keyword',
      value: parser.tokenValue
    };
  switch (t) {
    case Token.NumericLiteral:
      return {
        type: 'NumericLiteral',
        value: parser.tokenValue
      };
    case Token.StringLiteral:
      return {
        type: 'StringLiteral',
        value: parser.tokenValue
      };
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      return {
        type: 'BooleanLiteral',
        value: KeywordDescTable[t & Token.Kind] === 'true'
      };
    case Token.NullKeyword:
      return {
        type: 'NullLiteral',
        value: null
      };
    case Token.RegularExpression:
      return {
        type: 'RegularExpression',
        value: parser.tokenValue,
        regex: parser.tokenRegExp
      };
    case Token.TemplateCont:
    case Token.TemplateTail:
      return {
        type: 'TemplateLiteral',
        value: parser.tokenValue
      };
    default:
      return {
        type: 'Punctuator',
        value: KeywordDescTable[t & Token.Kind]
      };
  }
}
