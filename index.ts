import analyzeTypes from './src/analyzeTypes';

const source = `
type fn = (a: number, b: number) => number;
const fn2 = (a: number, b: number) => number;
function fn3(a: number, b: number, c: number): string;
function fn4(a: number, b: number, c: number): number;
`;

analyzeTypes(source);
