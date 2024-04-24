import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { UpdateBabyRecordUsecase } from "../../../usecases/baby-record/update";
import { IBabyRecordDTO } from "../../../usecases/dtos/baby-record-dto";

export class UpdateBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        const userId = req.session?.user?.id;
        const recordDTO: Partial<Omit<IBabyRecordDTO, "userId" | "actionName">> = {};
        if (!userId) {
            return res.status(401).json({ message: "User authentication failed" });
        }
        if (!id || !fields) {
            return res.status(400).json({ message: "Missing essential fields." });
        }
        if (fields.actionName) {
            return res.status(400).json({ message: "Not allowed change action-name" });
        }
        try {
            if (fields.end) { recordDTO.end = new Date(fields.end); }
            if (fields.init) { recordDTO.init = new Date(fields.init); }
            if (fields.observations) { recordDTO.observations = fields.observations; }
            if (fields.temperature) { recordDTO.temperature = fields.temperature; }
            if (fields.height) { recordDTO.height = fields.height; }
            if (fields.weight) { recordDTO.weight = fields.weight; }
            if (fields.sleepQuality) { recordDTO.sleepQuality = fields.sleepQuality; }
            if (fields.breastfeedingType) { recordDTO.breastfeedingType = fields.breastfeedingType; }
            if (fields.breastfeedingAmount) { recordDTO.breastfeedingAmount = fields.breastfeedingAmount; }
            const usecase = new UpdateBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId, recordDTO);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
