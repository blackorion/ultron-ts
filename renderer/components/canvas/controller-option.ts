export interface ControllerOption {
    id: string;
    isActive: boolean;

    toggle(): void;

    click(e: { x: number; y: number })
}