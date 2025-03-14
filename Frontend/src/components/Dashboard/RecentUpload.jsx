import React from "react";

export const RecentUpload = ({ student = {} }) => {
  const documents = Array.isArray(student) ? student : student.documents || [student];

  console.log("Documents Array:", documents);

  return (
    <div className="my-4">
      <h2 className="text-lg font-bold mb-4">Documents</h2>
      {documents.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-white">
              <tr>
                <th className="py-3 px-4 text-center font-medium">Document Name</th>
                <th className="py-3 px-4 text-center font-medium">Hash</th>
                <th className="py-3 px-4 text-center font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-t border-gray-300 bg-green-50">
                  <td className="py-3 px-4 text-center">{doc.documentName}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{doc.documentHash}</td>
                  <td className="py-3 px-4 text-center">{new Date(doc.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
};
