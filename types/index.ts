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
    name: string;
    description: string;
    image: string;
    website: string;
    category: string;
    data: string;
    voteCount: number;
}

export interface IExtendedGame extends IGame {
    hasVoted?: boolean;
    onVote?: (gameName: string) => void;
    user?: CustomJwtPayload | null;
}

export enum GameCategory {
    ACTION = "action",
    ADVENTURE = "adventure",
    CASINO = "casino",
    CASUAL = "casual",
    EDUCATIONAL = "educational",
    FAMILY = "family",
    FIGHTING = "fighting",
    MUSIC = "music",
    RACING = "racing",
    ROLE_PLAYING = "role-playing",
    SHOOTER = "shooter",
    SIMULATION = "simulation",
    SPORTS = "sports",
    STRATEGY = "strategy",
    SURVIVAL = "survival",
    TRIVIA = "trivia",
    WORD = "word",
}
