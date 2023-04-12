import {Service} from "./service.decorator";
import {IFileManager} from "./file.interface";
import {OnInit} from "./service.interface";

@Service('files')
export class FileService implements OnInit, IFileManager {
    init(): void {}
    close(file: File): void {}
    open(path: string): File {
        return undefined;
    }
    save(file: File): void {}
}