export interface Recipe {
    id: number;
    title: string;
    servings: number;
    time: number;
    ingridients: string[];
    method: string;
    pic: string;
    recipeType: string;
}