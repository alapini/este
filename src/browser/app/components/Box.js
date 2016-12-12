/* @flow */
import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  Color,
  Display,
  FlexDirection,
  FlexFlow,
  FlexWrap,
  JustifyContent,
  MarginSize,
  Size,
  Styled,
  TopBottomLeftRight,
} from '../themes/types';
import styled from './styled';

export type BoxProps = {
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  backgroundColor?: Color,
  border?: true | TopBottomLeftRight,
  borderColor?: Color,
  borderWidth?: number,
  display?: Display,
  flex?: number,
  flexBasis?: number | string,
  flexDirection?: FlexDirection,
  flexFlow?: FlexFlow,
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: FlexWrap,
  height?: number | string,
  justifyContent?: JustifyContent,
  margin?: MarginSize,
  marginBottom?: MarginSize,
  marginHorizontal?: MarginSize,
  marginLeft?: MarginSize,
  marginRight?: MarginSize,
  marginTop?: MarginSize,
  marginVertical?: MarginSize,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  order?: number,
  padding?: Size,
  paddingBottom?: Size,
  paddingHorizontal?: Size,
  paddingLeft?: Size,
  paddingRight?: Size,
  paddingTop?: Size,
  paddingVertical?: Size,
  style?: any,
  width?: number | string,
};

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const mapPropToStyle = (prop, value: any, theme, props) => {
  switch (prop) {
    case 'margin':
    case 'marginBottom':
    case 'marginLeft':
    case 'marginRight':
    case 'marginTop':
    case 'padding':
    case 'paddingBottom':
    case 'paddingLeft':
    case 'paddingRight':
    case 'paddingTop':
      return { [prop]: theme.sizes[value] || 'auto' };
    case 'marginHorizontal':
    case 'marginVertical':
    case 'paddingHorizontal':
    case 'paddingVertical': {
      const size = theme.sizes[value] || 'auto';
      const [d1, d2] = directionMapping[prop];
      return { [d1]: size, [d2]: size };
    }
    case 'width':
    case 'height':
    case 'maxWidth':
    case 'maxHeight':
    case 'minWidth':
    case 'minHeight':
    case 'display':
      return { [prop]: value };
    case 'backgroundColor':
      return { backgroundColor: theme.colors[value] };
    case 'flex': return { flex: value };
    case 'flexDirection': return { flexDirection: value };
    case 'flexFlow': return { flexFlow: value };
    case 'flexGrow': return { flexGrow: value };
    case 'flexWrap': return { flexWrap: value };
    case 'alignItems': return { alignItems: value };
    case 'alignContent': return { alignContent: value };
    case 'order': return { order: value };
    case 'flexShrink': return { flexShrink: value };
    case 'flexBasis': return { flexBasis: value };
    case 'alignSelf': return { alignSelf: value };
    default:
      return null;
  }
};

const mapPropsToStyle = (theme, props) => Object
  .keys(props)
  .reduce((style, prop) => {
    if (prop === 'theme') return style;
    const propStyle = mapPropToStyle(prop, props[prop], theme, props);
    if (propStyle === null) return style;
    return { ...style, ...propStyle };
  }, {});

// const bla = =// case 'border':
// // case 'borderColor':
// // case 'borderWidth': {
// //   if (prop !== 'border') return null;
// //   const borderProp = value === true
// //     ? 'border'
// //     : `border${value.charAt(0).toUpperCase()}${value.slice(1)}`;
// //   const width = props.borderWidth || theme.border.width;
// //   const color = props.borderColor
// //     ? theme.colors[props.borderColor]
// //     : theme.colors.gray;
// //   return {
// //     [borderProp]: `solid ${width}px ${color}`,
// //     borderRadius: theme.border.radius,
// //   };
// // }

// The box is the base component for almost everything.
//  Box - Text - Heading
//  Box - PageHeader
const Box: Styled<BoxProps> = styled((theme, props) => ({
  ...mapPropsToStyle(theme, props),
  // position: 'abslute',
  // return style;
}));

export default Box;
