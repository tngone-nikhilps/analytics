interface AnalyticsEvent {
  eventName: string;
  eventData: Record<string, any>;
  timestamp: string;
  url: string;
  userAgent: string;
}

class Analytics {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly batchSize: number = 10;
  private readonly batchInterval: number = 30000; // 30 seconds
  private readonly apiUrl: string = "https://your-analytics-api.com/log-events";

  constructor() {
    this.startBatchInterval();
  }

  public captureEvent(
    eventName: string,
    eventData: Record<string, any> = {}
  ): void {
    const event: AnalyticsEvent = {
      eventName,
      eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.eventQueue.push(event);
    console.log(`Event captured: ${eventName}`, eventData);

    if (this.eventQueue.length >= this.batchSize) {
      this.sendBatch();
    }
  }

  private async sendBatch(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const batch = this.eventQueue.splice(0, this.batchSize);

    try {
      console.log("batch cleared", JSON.stringify(batch));
    } catch (error) {
      console.error("Analytics error:", error);
      this.eventQueue.unshift(...batch);
    }
  }

  private startBatchInterval(): void {
    setInterval(() => this.sendBatch(), this.batchInterval);
  }

  public logPageView(pageName: string): void {
    this.captureEvent("PAGE_VIEW", { pageName });
  }
}

// Export a global instance of Analytics
const analytics = new Analytics();
