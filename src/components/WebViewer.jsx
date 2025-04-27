import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function WebViewerComponent() {
  const ref = useRef(null);

  useEffect(() => {
    WebViewer({
      path: '/lib/webviewer',
      initialDoc: '/report-biosensor.docx', // Set your DOCX file path here
      licenseKey: 'demo:1745619411379:6100596e0300000000cec4e228950dd6be8e57b6f5fcff99172249fc5f',
    }, ref.current)
      .then((instance) => {
        // Apply zoom once the document is loaded
        instance.docViewer.on('documentLoaded', () => {
          // Zoom to 82% by default (82% = 0.82)
          instance.setZoom(0.82);  // Use setZoom instead of zoomTo
        });
      });
  }, []);

  return (
    <div ref={ref} style={{ height: '100%' }}>
      {/* WebViewer content will be rendered here */}
    </div>
  );
}
