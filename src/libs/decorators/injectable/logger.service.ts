import {Service} from "./service.decorator";
import {ILogManager} from "./logger.interface";
import {OnInit} from "./service.interface";

@Service('logger')
export class LogService implements ILogManager, OnInit {
    debug = console.debug;
    err = console.error;
    msg = console.log;
    warn = console.warn;

    init(): void {
        this.debug('Logger is ready')
    }
}