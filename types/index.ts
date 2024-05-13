import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    admin?: boolean;
}

export interface CustomJwtPayload extends JwtPayload {
    admin?: boolean;
}
export interface IVote {
    email: string;
}

export interface IGame {
    nazwa: string;
    opis: string;
    baner: string;
    strona: string;
    typ: string;
    data: string;
}

export interface IExtendedGame extends IGame {
    hasVoted?: boolean;
    onVote?: (gameName: string) => void;
    user?: CustomJwtPayload | null;
}
