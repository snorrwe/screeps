export enum Direction {
    None = 0
    , Top
    , Bottom
    , Left
    , Right
    , TopLeft
    , TopRight
    , BottomLeft
    , BottomRight
}

export class Vector2 {
    x: number;
    constructor(x?: number | RoomPosition, public y?: number, public roomName?: string) {
        if (x) {
            if (x instanceof RoomPosition) {
                this.x = x.x;
                this.y = x.y;
                this.roomName = x.roomName;
            } else {
                this.x = x || 0;
            }
        }
        if (!this.x) this.x = 0;
        if (!this.y) this.y = 0;
        if (!this.roomName) this.roomName = "";
    }

    static equals(v: Vector2 | RoomPosition, pos: RoomPosition | Vector2): boolean {
        return v && pos && v.x == pos.x && v.y == pos.y && pos.roomName == v.roomName;
    }

    static convert(pos: RoomPosition): Vector2 {
        return new Vector2(pos);
    }

    static direction(from: Vector2 | RoomPosition, to: RoomPosition | Vector2): Direction {
        if (!from || !to) {
            return Direction.None;
        }
        let x = to.x - from.x;
        let y = to.y - from.y;
        let result: Direction;
        if (x > 0) {
            if (!y) {
                result = Direction.Right;
            } else if (y > 0) {
                result = Direction.TopRight;
            } else {
                result = Direction.BottomRight;
            }
        } else if (x < 0) {
            if (!y) {
                result = Direction.Left;
            } else if (y > 0) {
                result = Direction.TopLeft;
            } else {
                result = Direction.BottomLeft;
            }
        } else {
            if (!y) {
                result = Direction.None;
            } else if (y > 0) {
                result = Direction.Top;
            } else {
                result = Direction.Bottom;
            }
        }
        return result;
    }
}

