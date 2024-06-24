import { IHttpServer } from "@/interface-adapters/ports/http-server";
import { HttpControllerStrategies } from "@/interface-adapters/http/controller";
import { HttpValidator } from "@/interface-adapters/http/validator";

export class HttpRouter {
    constructor(httpServer: IHttpServer) {
        httpServer.on("get", "/baby-records",
            new HttpControllerStrategies.GetBabyRecords(),
            new HttpValidator()
                .setHeaderTokenValidator()
                .setQueryPaginationValidator()
                .setQueryBabyIdValidator()
        );

        httpServer.on("post", "/baby-record",
            new HttpControllerStrategies.PostBabyRecord(),
            new HttpValidator()
                .setHeaderTokenValidator()
                .setBodyRecordDTOValidator()
                .setBodyFieldValidator("babyId")
        );

        httpServer.on("patch", "/baby-record",
            new HttpControllerStrategies.PatchBabyRecord(),
            new HttpValidator()
                .setHeaderTokenValidator()
                .setBodyRecordDTOValidator()
                .setBodyFieldValidator("recordId")
                .setBodyDeniedFieldValidator("actionName")
        );

        httpServer.on("delete", "/baby-record",
            new HttpControllerStrategies.DeleteBabyRecord(),
            new HttpValidator()
                .setHeaderTokenValidator()
                .setQueryRecordIdValidator()
        );

        httpServer.on("post", "/baby",
            new HttpControllerStrategies.PostBaby(),
            new HttpValidator()
                .setHeaderTokenValidator()
                .setBodyFieldValidator("name")
                .setBodyFieldValidator("gender")
                .setBodyFieldValidator("birthday")
        );

        httpServer.on("get", "/babies",
            new HttpControllerStrategies.GetBaby(),
            new HttpValidator().setHeaderTokenValidator()
        );
    }
}