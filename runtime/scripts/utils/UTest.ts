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

    static ended(title: string): void {
        console.log("<====================\n");
        console.log("ended ->>> ", title, "\n")
        console.log("<====================\n");
        console.log("\n");
    }
};