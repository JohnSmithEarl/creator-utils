declare module "base/coding/UUTF8" {
    export class cu_UTF8 {
        static encode(str: string): string;
        static decode(utftext: string): string;
    }
}
declare module "base/coding/UBase64" {
    export class cu_Base64 {
        private static keyStr;
        static encode(input: string): string;
        static decode(input: string): string;
    }
}
declare module "base/coding/UBencode" {
    export class cu_Bencode {
    }
}
declare module "cu.All" {
    export * from "base/coding/UBase64";
    export * from "base/coding/UBencode";
    export * from "base/coding/UUTF8";
}
