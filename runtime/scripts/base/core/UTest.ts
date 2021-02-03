export class UTest {
    static begin(title: string): void {
        console.log("\n");
        console.log("====================>\n");
        console.log("start ->>> ", title, "\n");
        console.log("====================>\n");
    }

    static line(): void {
        console.log("--------------------");
    }

    public static test(testName: string, exec: Function) {
        console.log("--------------------\n");
        exec(this);
    }

    static ended(title: string): void {
        console.log("<====================\n");
        console.log("ended ->>> ", title, "\n")
        console.log("<====================\n");
        console.log("\n");
    }
};