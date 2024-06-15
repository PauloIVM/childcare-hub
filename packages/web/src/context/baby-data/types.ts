export interface BabyData {
    selectedBabyId?: string;
    babies: {
        id: string;
        name: string;
        gender: string;
        birthday: Date;
    }[];
}
