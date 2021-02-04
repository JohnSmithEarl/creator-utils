export class Test {
    public static test(title: string, execFuncs: Array<Function>) {
        console.log("====================>\n");
        console.log("start ->>> ", title, "\n");
        console.log("====================>\n");

        for (let i = 0; i < execFuncs.length; i++) {
            console.log("--------------------\n");
            let execFunc = execFuncs[i];
            execFunc(this);
        }

        console.log("<====================\n");
        console.log("ended ->>> ", title, "\n")
        console.log("<====================\n");
        console.log("\n");
    }
};