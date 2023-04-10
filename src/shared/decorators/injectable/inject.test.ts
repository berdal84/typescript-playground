import {describe, expect, test, jest} from '@jest/globals';
import {Inject} from './inject.decorator'
import {ILogManager} from "./logger.interface";
import {IFileManager} from "./file.interface";
import {FileService} from "./file.service";
import {LogService} from "./logger.service";

describe('injectable', () => {

    test('@Inject', () => {
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