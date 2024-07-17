interface AnalyticsEvent {
    eventName: string;
    eventData: Record<string, any>;
    timestamp: string;
    url: string;
    userAgent: string;
}
declare class Analytics {
    private eventQueue;
    private readonly batchSize;
    private readonly batchInterval;
    private readonly apiUrl;
    constructor();
    captureEvent(eventName: string, eventData?: Record<string, any>): void;
    private sendBatch;
    private startBatchInterval;
    logPageView(pageName: string): void;
}
declare const analytics: Analytics;
