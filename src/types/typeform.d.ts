
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

interface Window {
  tf: Typeform;
}

// Additional TypeForm hidden field properties for div elements
interface HTMLDivElement {
  dataset: {
    tfHiddenEmail?: string;
    tfHidden?: string;
    tfLive?: string; // Added tfLive property for the form ID
  }
}
