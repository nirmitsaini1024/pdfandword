import React, { Suspense, useState } from "react";
import PDFViewer from "./components/pdf-viewer";
import ReferenceTexts from "./components/reference-texts";
import WordViewer from "./components/WebViewer";

// New component for the full page popup
const FullPagePopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-11/12 max-w-[1400px] h-5/6 rounded-lg shadow-xl relative overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl z-10"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default function App() { 
  const [searchPluginInstance1, setSearchPluginInstance1] = useState(null);
  const [searchPluginInstance, setSearchPluginInstance] = useState(null);
  const [wordSearchResults, setWordSearchResults] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  
  // State for full page popup
  const [isFullPagePopupOpen, setIsFullPagePopupOpen] = useState(false);

  // Open full page popup
  const openFullPagePopup = () => {
    setIsFullPagePopupOpen(true);
  };

  // Close full page popup
  const closeFullPagePopup = () => {
    setIsFullPagePopupOpen(false);
  };

  // Callback for handling search in the Word viewer
  const handleSearch = (searchQuery) => {
    console.log(`Searching for: ${searchQuery} in Word documents`);
    setCurrentSearchTerm(searchQuery);
    
    // Here you would implement actual Word document search
    setWordSearchResults([]);
  };

  // Callback for navigating to Word result
  const onNavigateToWordResult = (match) => {
    console.log("Navigating to Word result: ", match);
  };

  // Main content render function
  const renderMainContent = () => (
    <div className="flex flex-col h-full bg-white text-gray-800">
      <header className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-blue-500">Compare Final vs working copy</h1>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-0 h-full overflow-hidden">
          {/* PDF Viewer Panel */}
          <div className="border-r border-gray-200 h-full overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">Final Copy</h2>
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
              <h2 className="text-lg font-medium">Working Copy</h2>
            </div>
            <div className="h-[calc(100%-57px)]">
              <WordViewer onSetSearchPluginInstance={setSearchPluginInstance1}/>
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
                  <div className="">
                  <ReferenceTexts
                    searchPluginInstance={searchPluginInstance}
                    wordViewerResults={wordSearchResults}
                    onSearch={handleSearch}
                    onNavigateToWordResult={onNavigateToWordResult}
                  />
                  <ReferenceTexts
                    searchPluginInstance={searchPluginInstance1}
                    wordViewerResults={wordSearchResults}
                    onSearch={handleSearch}
                    onNavigateToWordResult={onNavigateToWordResult}
                  />
                  </div>
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

  return (
    <div>
      {/* Initial view with Open button */}
      <div className="p-4">
        <button 
          onClick={openFullPagePopup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Documents
        </button>
      </div>

      {/* Full Page Popup */}
      <FullPagePopup 
        isOpen={isFullPagePopupOpen}
        onClose={closeFullPagePopup}
      >
        {renderMainContent()}
      </FullPagePopup>
    </div>
  );
}