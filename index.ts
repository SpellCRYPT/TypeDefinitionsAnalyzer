import analyzeTypes from './src/analyzeTypes';

const source = `
function fn1(a: number, b: number, c: number): string;
function fn2(a: number, b: number, c: number): number;
`;

analyzeTypes(source);
