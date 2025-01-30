import type React from "react"
import { useState } from "react"
import type {Record} from '@/types/Record'
import EditModal from "./EditModal"
import Pagination from "./Pagination"
import { toast } from "react-hot-toast"

interface RecordListProps {
  records: Record[]
  onUpdate: (id: string, updatedRecord: Partial<Record>) => void
  onDelete: (id: string) => void
}

const RecordList: React.FC<RecordListProps> = ({ records, onUpdate, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingRecord, setEditingRecord] = useState<Record | null>(null)
  const recordsPerPage = 10

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord)

  const handleEdit = (record: Record) => {
    setEditingRecord(record)
  }

  const handleUpdate = (updatedRecord: Record) => {
    onUpdate(updatedRecord.id, updatedRecord)
    setEditingRecord(null)
    toast.success("Record updated successfully")
  }


  const handleDelete = (id: string) => {
    toast(
      (t: any) => (
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-medium">Are you sure you want to delete?</p>
          <div className="flex gap-3">
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => {
                onDelete(id);
                toast.dismiss(t.id); 
                toast.success("Record deleted successfully");
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000, 
        position: "top-center",
      }
    );
  };
  

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{record.id}</td>
              <td className="px-4 py-2">{record.name}</td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(records.length / recordsPerPage)}
        onPageChange={setCurrentPage}
      />
      {editingRecord && (
        <EditModal record={editingRecord} onSave={handleUpdate} onClose={() => setEditingRecord(null)} />
      )}
    </div>
  )
}

export default RecordList



