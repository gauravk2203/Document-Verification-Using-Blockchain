const DocumentCard = ({ storedDocument, handleAddToVault }) => {
  return (
      <div className="mt-4 border rounded-lg shadow-lg p-4">
          <img 
              src={`https://api.pinata.cloud/ipfs/${storedDocument.documentHash}`} 
              alt="Document" 
              className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{storedDocument.documentName}</h2>
          {/* <p className="text-gray-700">Type: {storedDocument.type}</p> */}
          {/* <p className="text-gray-700">Size: {storedDocument.size}</p> */}
          <p className="text-green-500 mt-2">
              Hash Found: 
              <a 
                  href={`https://api.pinata.cloud/ipfs/${storedDocument.documentHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline"
              >
                  {storedDocument.documentHash}
              </a>
          </p>
          <div className="flex gap-2 mt-2">
              <button 
                  onClick={handleAddToVault} 
                  className="bg-green-500 text-white p-2 rounded w-full"
              >
                  Add to My Vault
              </button>
              <a 
                  href={`https://api.pinata.cloud/ipfs/${storedDocument.documentHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white p-2 rounded w-full text-center"
              >
                  Visit Document
              </a>
          </div>
      </div>
  );
};

export default DocumentCard;
