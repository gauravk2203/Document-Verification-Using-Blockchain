import React from "react";

export const StudentList = ({ onClick, students }) => {
  return (
    <div className="my-4">
      <div className="text-lg font-bold mb-4">Students</div>
      <hr className="h-px bg-gray-200 border-0" />
      <div className="w-full my-4">
        <input 
          type="search" 
          className="w-2/5 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
          placeholder="Search by name" 
        />
      </div>
      <div className="overflow-hidden rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Student Name</th>
              <th className="text-left py-3 px-4 font-medium">Batch</th>
              <th className="text-left py-3 px-4 font-medium">Branch</th>
              <th className="text-left py-3 px-4 font-medium">PID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr 
                key={index} 
                className="border-t border-gray-300 bg-green-50 cursor-pointer hover:bg-green-100 transition"
                onClick={() => onClick(student)}
              >
                <td className="py-3 px-4">{student.studentName}</td>
                <td className="py-3 px-4">{student.batch}</td>
                <td className="py-3 px-4">{student.course}</td>
                <td className="py-3 px-4">{student.pid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
