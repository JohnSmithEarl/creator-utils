export class Graphics {
    static clear(graphics) {
        graphics.clear();
    };

    static drawLine(graphics, fromP = cc.v2(), toP = cc.v2(), lineWidth = 2, color = cc.Color.BLACK) {
        graphics.lineWidth = lineWidth;
        graphics.strokeColor = color;
        graphics.moveTo(fromP.x, fromP.y);
        graphics.lineTo(toP.x, toP.y);
        graphics.stroke();
    };

    static drawCircle = function (graphics, P = cc.v2(), radius = 6, color = cc.Color.BLACK) {
        graphics.fillColor = color;
        graphics.circle(P.x, P.y, radius);
        graphics.fill();
    };

    static drawBezier = function (graphics, P0 = cc.v2(), P1 = cc.v2(), P2 = cc.v2(), P3 = cc.v2(), lineWidth = 2, color = cc.Color.BLACK) {
        graphics.lineWidth = lineWidth;
        graphics.strokeColor = color;
        graphics.moveTo(P0.x, P0.y);
        graphics.bezierCurveTo(P1.x, P1.y, P2.x, P2.y, P3.x, P3.y);
        graphics.stroke();
    };
};