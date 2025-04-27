"use client";

import React, { Suspense, useState } from "react";
import PDFViewer from "./components/pdf-viewer";
import WebViewerComponent from "./components/WebViewer";
import ReferenceTexts from "./components/reference-texts";

export default function App() {
  const [searchPluginInstance, setSearchPluginInstance] = useState(null);
  const [wordSearchResults, setWordSearchResults] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  
  // Callback for handling search in the Word viewer
  const handleSearch = (searchQuery) => {
    console.log(`Searching for: ${searchQuery} in Word documents`);
    setCurrentSearchTerm(searchQuery);
    
    // Here you would implement actual Word document search
    // For now, we'll just set an empty array since we're focusing on PDF search
    setWordSearchResults([]);
    
    // If you integrate actual Word search in the future, replace the empty array
    // with real search results from your Word component
  };

  // Callback for navigating to Word result
  const onNavigateToWordResult = (match) => {
    console.log("Navigating to Word result: ", match);
    // Implement logic to navigate in your Word viewer when needed
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <header className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-blue-500">PDF Viewer and Web Viewer</h1>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-0 h-full overflow-hidden">
          {/* PDF Viewer Panel */}
          <div className="border-r border-gray-200 h-full overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">PDF Viewer</h2>
              {currentSearchTerm && (
                <div className="text-xs text-gray-500 mt-1">
                  Showing highlights for: "{currentSearchTerm}"
                </div>
              )}
            </div>
            <div className="h-[calc(100%-57px)]">
              <PDFViewer 
                onSetSearchPluginInstance={setSearchPluginInstance}
              />
            </div>
          </div>

          {/* WebViewer Panel */}
          <div className="h-full overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">WebViewer Component</h2>
            </div>
            <div className="h-[calc(100%-57px)]">
              <WebViewerComponent />
            </div>
          </div>

          {/* Reference Text Panel */}
          <div className="h-full">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">Search</h2>
              <div className="text-xs text-gray-500 mt-1">
                Search in PDF document
              </div>
            </div>
            <div className="h-[calc(100%-57px)] overflow-hidden">
              <Suspense fallback={<div className="p-4">Loading search panel...</div>}>
                {searchPluginInstance ? (
                  <ReferenceTexts
                    searchPluginInstance={searchPluginInstance}
                    wordViewerResults={wordSearchResults}
                    onSearch={handleSearch}
                    onNavigateToWordResult={onNavigateToWordResult}
                  />
                ) : (
                  <div className="p-4">Loading search plugin...</div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}