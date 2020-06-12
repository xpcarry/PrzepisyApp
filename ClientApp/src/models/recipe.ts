import { IUser } from "./user";

export interface IRecipe {
    id: string;
    title:string;
    ingredients: [];
    calories: number; 
    recipeType:string;
    recipeDifficulty:string;
    description: string;
    imageUrl: string;
    datePosted: Date | null;
    user: IUser | null;
}

export interface IManageRecipe {
    id: string;
    title:string;
    datePosted: Date | null;
    username:string;
}

export interface IComment{
    id:string;
    textBody:string;
    datePosted: Date | null;
    user:IUser;
}