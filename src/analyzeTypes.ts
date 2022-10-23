import ts from 'typescript';

const analyzeTypes = (source: string) => {
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

    const typeChecker = program.getTypeChecker();
    const functions = program
        .getSourceFile(file)
        ?.statements.filter((s) => s.kind === ts.SyntaxKind.FunctionDeclaration)
        .map((s) => s as ts.FunctionDeclaration);

    for (const fnNode of functions ?? []) {
        console.log('----------------------------------------');

        const nodeText = fnNode.getText(sourceFile);
        console.log(`NodeText: ${nodeText}`);
        const parametersNodes = fnNode.parameters;
        for (const parmeterNode of parametersNodes) {
            const paramName = parmeterNode.name.getText();
            const type = typeChecker.getTypeAtLocation(parmeterNode);
            const typeName = typeChecker.typeToString(type, parmeterNode);
            console.log('-----------------');
            console.log('parameterType:', typeName);
            console.log('parameterName:', paramName);
        }

        const returnType = typeChecker.getTypeAtLocation(fnNode);
        const returnTypeSignature = typeChecker.getSignaturesOfType(
            returnType,
            ts.SignatureKind.Call
        )[0];
        console.log('--------');
        console.log(
            'returnType:',
            typeChecker.typeToString(returnTypeSignature.getReturnType())
        );
    }
};

export default analyzeTypes;
