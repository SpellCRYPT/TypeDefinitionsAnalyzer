import ts from 'typescript';

const analyze = (source: string) => {
    const file = 'analyze.ts';
    const sourceFile = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest // scriptTarget
        // true // setParentNodes -- sets the `parent` property
    );

    const defaultCompilerHost = ts.createCompilerHost({});

    const customCompilerHost: ts.CompilerHost = {
        getSourceFile: (name, languageVersion) => {
            console.log(`getSourceFile ${name}`);

            if (name === file) {
                return sourceFile;
            } else {
                return defaultCompilerHost.getSourceFile(name, languageVersion);
            }
        },
        writeFile: (_, __) => {},
        getDefaultLibFileName: () => 'lib.d.ts',
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: (filename) => filename,
        getCurrentDirectory: () => '',
        getNewLine: () => '\n',
        getDirectories: () => [],
        fileExists: () => true,
        readFile: () => '',
    };

    const program = ts.createProgram([file], {}, customCompilerHost);

    const statements = sourceFile.statements;

    return {
        statements: statements,
        program: program,
    };
};

export default analyze;
