export class HttpQuery {
    static skip = "s" as const;
    static limit = "l" as const;
    static babyId = "bid" as const;
    static recordId = "rid" as const;
    s?: string;
    l?: string;
    bid?: string;
    rid?: string;
}
