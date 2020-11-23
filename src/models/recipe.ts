export interface Recipe {
    id: number;
    title: string;
    servings: number;
    time: number;
    ingridients: any[];
    method: string;
    pic: string;
    recipeType: string;
}