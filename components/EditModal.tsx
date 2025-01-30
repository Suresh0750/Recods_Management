import type React from "react"
import { useState } from "react"
import type {Record} from '@/types/Record'
import {isValidEmail, isValidName} from '@/utils/validate'
interface EditModalProps {
  record: Record
  onSave: (updatedRecord: Record) => void
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ record, onSave, onClose }) => {
  const [name, setName] = useState(record.name)
  const [email, setEmail] = useState(record.email)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(name) || !isValidName(email) ) {
      setError("Name and email are required")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format")
      return
    }
    onSave({ ...record, name, email })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal

