declare module "base/coding/cu.UTF8" {
    export class cu_UTF8 {
        static encode(str: string): string;
        static decode(utftext: string): string;
    }
}
declare module "base/coding/cu.Base64" {
    export class cu_Base64 {
        private static keyStr;
        static encode(input: string): string;
        static decode(input: string): string;
    }
}
declare module "base/coding/cu.Bencode" {
    export class cu_Bencode {
    }
}
declare module "cu.All" {
    export * from "base/coding/cu.Base64";
    export * from "base/coding/cu.Bencode";
    export * from "base/coding/cu.UTF8";
}
