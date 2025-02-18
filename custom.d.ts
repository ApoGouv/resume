declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';
declare module 'postcss-sort-media-queries';

declare module '@/Pages/LetterDraftPage/jsPDF-Fonts/Lato-Regular-normal.js' {
  const fontData: string;
  export default fontData;
}
