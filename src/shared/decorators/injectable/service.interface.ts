
export interface OnInit {
    init: () => void;
}

export interface OnUpdate {
    update: () => void;
}

export interface OnDestroy {
    destroy: () => void;
}

export type IService = OnUpdate | OnInit | OnDestroy;