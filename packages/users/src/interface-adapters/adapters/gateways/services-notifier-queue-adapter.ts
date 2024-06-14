import { IServicesNotifierGateway } from "@/application/ports/gateways";
import { IQueue } from "@/interface-adapters/ports/queue";

export class ServicesNotifierQueueAdapter implements IServicesNotifierGateway {
    private queue: IQueue;
    constructor(queue: IQueue) {
        this.queue = queue;
    }

	async notifyUserCreated(userId: string): Promise<void> {
        await this.queue.publish("users.notifications", "user.created", userId);
    }

	async notifyUserDeleted(userId: string): Promise<void> {}
}
