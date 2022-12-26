import { v4 } from 'uuid';

export interface SubscriberImpl {
    subscriberId: string;
    listen(reason: any): void;
}

export interface PublisherImpl {
    notify<T>(reason: T, props: any): void;
    register(target: SubscriberImpl): void;
    unregister(target: SubscriberImpl): void;
}

export class Publisher implements PublisherImpl {
    private subscribers: SubscriberImpl[];

    constructor() {
        this.subscribers = [];
    }

    unregister(target: SubscriberImpl): void {
        this.subscribers = this.subscribers.filter((subscriber) => target.subscriberId !== subscriber.subscriberId);
    }

    register(target: SubscriberImpl): void {
        target.subscriberId = v4();
        this.subscribers.push(target);
    }

    notify(reason: any): void {
        for (const subscriber of this.subscribers) {
            subscriber.listen(reason);
        }
    }
}
