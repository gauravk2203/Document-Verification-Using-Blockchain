import React from "react";

const DocumentCard = React.memo(({ document }) => {
  const pinata = "https://rose-quiet-starfish-132.mypinata.cloud/ipfs/";

  return (
    <div className="w-72 h-fit bg-white border-2 rounded-xl p-4 shadow-md transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between cursor-pointer">
      <div className="w-full h-36 bg-gray-300 rounded-md mb-3">
        <img src={pinata + document.documentHash } alt="" />
      </div>
      <div className="flex-grow text-left">
        <h4 className="text-lg font-semibold">{document?.documentName || "Untitled Document"}</h4>
        <p className="text-sm font-medium text-gray-800 break-words">Hash: {document?.documentHash || "N/A"}</p>
        <p className="text-sm text-gray-600">{document?.course || "Unknown Course"}</p>
        <p className="text-sm text-gray-600">{document?.institution || "Unknown Institution"}</p>
        <p className="text-xs text-gray-500 mt-auto">{document?.createdAt || "Issue Date Unavailable"}</p>
      </div>
    </div>
  );
});

export const MyVault = ({ documents = [] }) => {
  return (
    <div className="p-5 mx-auto">
      <h2 className="text-2xl font-semibold mb-5">My Vault</h2>
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <div className="flex flex-wrap gap-5 ">
          {documents.map((doc) => (
            <DocumentCard key={doc.hash || Math.random()} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
