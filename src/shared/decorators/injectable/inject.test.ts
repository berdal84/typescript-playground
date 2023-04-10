import {describe, expect, test, jest} from '@jest/globals';
import {Inject, Service, OnUpdate, IService, OnInit} from '.'

describe('injectable', () => {

    test('@Inject', () => {

        // prepare
        interface IFileManager {
            open(path: string): File;
            close(file: File): void;
            save(file: File): void;
        }

        @Service('files')
        class FileService implements OnInit, IFileManager {
            init(): void {}
            close(file: File): void {}
            open(path: string): File {
                return undefined;
            }
            save(file: File): void {}
        }

        interface ILogManager {
            msg(...args: any[]): void;
            debug(...args: any[]): void;
            warn(...args: any[]): void;
            err(...args: any[]): void;
        }

        @Service('logger')
        class LogService implements ILogManager, OnInit {
            debug = console.debug;
            err = console.error;
            msg = console.log;
            warn = console.warn;

            init(): void {
                this.debug('Logger is ready')
            }
        }

        /* class using two services without explicitly giving a class or an instance */
        class ClassWithInjectedServices {
            @Inject('logger') logger: ILogManager;
            @Inject('files')  files: IFileManager;

            // TODO:
            // - declare services in the constructor
            // - instantiate components with injected services automatically via a factory
        }

        // act
        const entity = new ClassWithInjectedServices();

        // check
        expect(entity.logger).toBeInstanceOf(LogService)
        expect(entity.files).toBeInstanceOf(FileService)
    })
})