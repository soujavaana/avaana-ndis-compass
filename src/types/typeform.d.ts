
interface Typeform {
  createWidget: () => void;
}

interface Window {
  tf: Typeform;
}

// Additional TypeForm hidden field properties for div elements
interface HTMLDivElement {
  dataset: {
    tfHiddenEmail?: string;
    tfHidden?: string;
  }
}
