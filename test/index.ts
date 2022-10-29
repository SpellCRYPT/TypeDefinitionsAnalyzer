import analyzeFunctionTypes from '../src/analyzeFunctionTypes';
import extractNamespace from '../src/extractNamespace';
import analyzer from '../src/analyzer';

const source = `
function fn1(a: number, b: number, c: number): string;
export function fn2(a: number, b: number, c: number): number;
declare function fn3(a: number, b: number, c: number): number;
declare namespace console {
    const a = 10;
    function log(...args: any[]): void;
};
`;

const { statements, program } = analyzer(source);

for (const statement of statements) {
    analyzeFunctionTypes(program, statement);
    extractNamespace(statement);
}

for (const statement of statements) {
    const namespaceBody = extractNamespace(statement)?.statements;
    for (const namespaceStatement of namespaceBody ?? []) {
        analyzeFunctionTypes(program, namespaceStatement);
    }
}
