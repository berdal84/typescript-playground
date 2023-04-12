export interface IFileManager {
    open(path: string): File;
    close(file: File): void;
    save(file: File): void;
}