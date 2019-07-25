import Store from '../../../store';
import { pipe } from 'rambda';

export const PRIMITIVES = {
  string: true,
  integer: true,
  boolean: true,
  float: true,
  number: true,
  array: true,
  struct: true,
};

export const extractType = type => (type.name ? type.typeParams[0] : type);

export const memberIsNotEmpty = member =>
  member && (member.members.length > 0 || member.enum);

export const isPrimitiveType = type => {
  if (typeof type === 'string' && PRIMITIVES[type] && !type.includes('.')) {
    return true;
  }
  return false;
};

export const getMemberFromType = type => {
  return Store.instance().getMemberByType(type);
};

export const isEnumType = member =>
  member && member.enum && member.enum.length > 0;

const lowerCase = str => str.toLowerCase();

const isArrayType = type => type.name && lowerCase(type.name) === 'array';

export const getTypeDisplayName = type => {
  if (typeof type === 'string' && PRIMITIVES[lowerCase(type)]) {
    return type;
  }
  if (isArrayType(type)) {
    return `array<${getTypeDisplayName(type.typeParams[0])}>`;
  }
  if (isEnumType(getMemberFromType(type))) {
    return 'enum';
  }
  return 'object';
};

const enumToDocsDisplay = enums =>
  enums.map(value => `**${value}**`).join('\n\n');

const generateEnumDoc = member => {
  return `${member.doc || ''}\n\nPossible values are:\n\n${enumToDocsDisplay(
    member.enum,
  )}`;
};

export const transformEnumData = member => {
  return [
    {
      name: member.name,
      type: 'string',
      doc: generateEnumDoc(member),
    },
  ];
};

export const getMembers = pipe(
  extractType,
  getMemberFromType,
);
