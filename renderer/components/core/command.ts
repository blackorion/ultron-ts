export interface Command {
    render(ctx: CanvasRenderingContext2D, index: number): void;

    commands: string[];
}