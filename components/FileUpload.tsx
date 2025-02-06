import type React from "react"
import { useRef } from "react"
import { toast } from "react-hot-toast"
import type {Record} from '@/types/Record'
import {isValidator} from '@/utils/validate'


interface FileUploadProps {
  onUpload: (records: Record[]) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string)
          if (Array.isArray(json) && file?.type=="application/json") {
            const uniqueRecords = removeDuplicates(json)
            onUpload(uniqueRecords)
            toast.success("File uploaded successfully")
          } else {
            toast.error("Invalid JSON format")
          }
        } catch (error:unknown) {
          if (error instanceof SyntaxError) {
            toast.error("Invalid JSON file format")
          } else {
            toast.error("An unexpected error occurred")
          }
        }
      }
      reader.readAsText(file)
    }
  }

  const removeDuplicates = (records: Record[]): Record[] => {
    const uniqueEmails = new Set()
    return records.filter((record) => {
      if (!uniqueEmails.has(record.email) && isValidator(record)) {
        uniqueEmails.add(record.email)
        return true
      }
      return false
    })
  }

  return (
    <div className="mb-8">
      <input type="file" accept=".json" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Upload JSON File
      </button>
    </div>
  )
}

export default FileUpload