export interface IFileManager {
    open(path: string): File | never;
    close(file: File): void;
    save(file: File): void;
}