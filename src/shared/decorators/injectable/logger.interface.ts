export interface ILogManager {
    msg(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    err(...args: any[]): void;
}