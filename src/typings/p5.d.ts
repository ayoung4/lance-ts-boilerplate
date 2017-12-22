declare class p5Sketch {
    setup();
    draw();
    mousePressed(): void;
    createCanvas(w: number, h: number): void;
    background(r: number, g?: number, b?: number, a?: number): void;
    clear(): void;
    colorMode(mode: 'RGB' | 'HSB' | 'HSL', m1?: number, m2?: number, m3?: number, mA?: number): void;
    fill(r: number, g: number, b: number): void;
    noFill(): void;
    noStroke(): void;
    stroke(r: number, g: number, b: number, a: number): void;
    arc(a: number, b: number, c: number, d: number, start: number, stop: number, mode?: 'OPEN' | 'CHORD' | 'PIE'): void;
    ellipse(x: number, y: number, w: number, h: number): void;
    // TODO: complete typings
}
