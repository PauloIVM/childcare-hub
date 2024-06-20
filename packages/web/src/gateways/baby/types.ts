export interface IFetchBabiesResponse {
    babies: {
        id: string;
        name: string;
        gender: string;
        birthday: Date;
    }[];
    message: string;
}
