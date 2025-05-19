
interface Typeform {
  createWidget: () => void;
  embed: (options: {
    id: string;
    container: HTMLElement;
    hidden?: Record<string, string>;
    onSubmit?: (data: any) => void;
    onReady?: () => void;
    onQuestionChanged?: (data: any) => void;
    transitiveSearchParams?: string[];
    width?: string | number;
    height?: string | number;
    opacity?: number;
  }) => void;
}

interface TypeformResponse {
  form_id: string;
  token: string;
  landed_at: string;
  submitted_at: string;
  hidden: Record<string, string>;
  definition: {
    id: string;
    title: string;
    fields: Array<{
      id: string;
      ref: string;
      type: string;
      title: string;
    }>;
  };
  answers: Array<{
    field: {
      id: string;
      type: string;
      ref: string;
    };
    type: string;
    [key: string]: any;
  }>;
}

interface TypeformWebhookPayload {
  event_id: string;
  event_type: "form_response" | "form_response_partial";
  form_response: TypeformResponse;
}

interface Window {
  tf: Typeform;
}

// Additional TypeForm hidden field properties for div elements
interface HTMLDivElement {
  dataset: {
    tfHiddenEmail?: string;
    tfHiddenUserId?: string;
    tfHidden?: string;
    tfLive?: string; // Added tfLive property for the form ID
  }
}
