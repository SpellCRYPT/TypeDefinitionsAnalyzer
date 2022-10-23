import ts from 'typescript';

interface Namespace {
    name: string;
    statements: Array<ts.Node>;
}

const extractNamespace = (namespaceNode: ts.Node): Namespace | undefined => {
    if (namespaceNode.kind !== ts.SyntaxKind.ModuleDeclaration) {
        return;
    }

    const sourceFile = namespaceNode.getSourceFile();
    const namespace = namespaceNode as ts.ModuleDeclaration;

    console.log('----------------------------------------');

    const nodeText = namespace.getText(sourceFile);
    console.log(`NodeText: ${nodeText}`);

    const namespaceName = namespace.name.getText();
    console.log('Namespace name:', namespaceName);

    const namespaceBody = namespace.body as ts.ModuleBlock;
    const namespaceBodyStatements = Array.from(namespaceBody.statements);

    console.log(
        'Namespace body statements:',
        namespaceBodyStatements.map((s) => s.getText(sourceFile))
    );

    return {
        name: namespaceName,
        statements: namespaceBodyStatements,
    };
};

export default extractNamespace;
