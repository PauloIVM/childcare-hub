import { BabyRecord } from "../";

describe("BabyRecord", () => {
    test("should create record", async () => {
        const record = new BabyRecord("record_id", "user_id", "sleep", new Date("02/02/2024"))
            .setObservations("obs")
            .setBreastfeedingAmount(10)
            .setBreastfeedingType(null)
            .setBreastfeedingType("right")
            .setEnd(null)
            .setEnd(new Date("03/03/2024"))
            .setInit(new Date("01/01/2024"))
            .setHeight(20)
            .setSleepQuality(null)
            .setSleepQuality("very_bad")
            .setTemperature(30)
            .setWeight(40);
        expect(record.action.name).toBe("sleep");
        expect(record.action.label).toBe("Dormir");
        expect(record.id).toBe("record_id");
        expect(record.userId).toBe("user_id");
        expect(record.observations).toBe("obs");
        expect(record.breastfeedingAmount).toBe(10);
        expect(record.breastfeedingType).toBe("right");
        expect(record.end.getTime()).toBe(new Date("03/03/2024").getTime());
        expect(record.init.getTime()).toBe(new Date("01/01/2024").getTime());
        expect(record.height).toBe(20);
        expect(record.sleepQuality).toBe("very_bad");
        expect(record.temperature).toBe(30);
        expect(record.weight).toBe(40);
    });

    test("should not accept bad 'end' Date", async () => {
        const record = new BabyRecord(
            "record_id",
            "user_id",
            "sleep",
            new Date("02/02/2024")
        );
        expect(() => record.setEnd(new Date("01/01/2024"))).toThrow(new Error(
            "'end' field should be greater than 'init'."
        ));
    });

    test("should not accept bad 'init' Date", async () => {
        const record = new BabyRecord(
            "record_id",
            "user_id",
            "sleep",
            new Date("02/02/2024")
        );
        record.setEnd(new Date("03/03/2024"));
        expect(() => record.setInit(new Date("04/04/2024"))).toThrow(new Error(
            "'end' field should be greater than 'init'."
        ));
    });

    test("should not accept bad 'sleepQuality' field", async () => {
        const record = new BabyRecord("id", "user_id", "sleep", new Date());
        expect(() => record.setSleepQuality("foo")).toThrow(new Error(
            "Invalid 'sleep_quality' field."
        ));
    });

    test("should not accept bad 'breastfeedingType' field", async () => {
        const record = new BabyRecord("id", "user_id", "sleep", new Date());
        expect(() => record.setBreastfeedingType("foo")).toThrow(new Error(
            "Invalid 'set_breastfeeding_type' field"
        ));
    });

    test("should not accept bad 'action' field", async () => {
        expect(() => new BabyRecord("id", "user_id", "foo", new Date())).toThrow(new Error(
            "Invalid action name."
        ));
        expect(() => new BabyRecord("id", "user_id", null, new Date())).toThrow(new Error(
            "Invalid action name."
        ));
    });
});