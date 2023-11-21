export interface IRole {
    name: string;
    id?: number | string;
    activities?: Array<string>;
    permissions?: Array<string>
}

export interface ICrud {
    create: boolean;
    update: boolean;
    read: boolean;
    delete: boolean;
}

export interface IModule {
    [key: string]: ICrud
}

export const def: IModule = {};
