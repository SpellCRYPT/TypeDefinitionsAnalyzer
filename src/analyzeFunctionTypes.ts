import ts from 'typescript';

interface SerializedFunction {
    name: string;
    paramsTypes: Array<string>;
    returnType: string;
}

const analyzeFunctionTypes = (
    program: ts.Program,
    fnNode: ts.Node
): SerializedFunction | undefined => {
    if (fnNode.kind !== ts.SyntaxKind.FunctionDeclaration) {
        return;
    }

    const paramsTypeNames: Array<string> = [];

    const sourceFile = fnNode.getSourceFile();
    const typeChecker = program.getTypeChecker();
    const fn = fnNode as ts.FunctionDeclaration;

    console.log('----------------------------------------');

    const nodeText = fn.getText(sourceFile);
    console.log(`NodeText: ${nodeText}`);

    const fnName = fn.name?.text;
    console.log('Function name:', fnName);

    const parametersNodes = fn.parameters;
    for (const parmeterNode of parametersNodes) {
        const paramName = parmeterNode.name.getText();
        const type = typeChecker.getTypeAtLocation(parmeterNode);
        const typeName = typeChecker.typeToString(type, parmeterNode);
        paramsTypeNames.push(typeName);
        console.log('-----------------');
        console.log('parameterType:', typeName);
        console.log('parameterName:', paramName);
    }

    const returnType = typeChecker.getTypeAtLocation(fn);
    const returnTypeSignature = typeChecker.getSignaturesOfType(
        returnType,
        ts.SignatureKind.Call
    )[0];
    const returnTypeName = typeChecker.typeToString(
        returnTypeSignature.getReturnType()
    );
    console.log('--------');
    console.log('returnType:', returnTypeName);

    return {
        name: fnName!,
        paramsTypes: paramsTypeNames,
        returnType: returnTypeName,
    };
};

export default analyzeFunctionTypes;
