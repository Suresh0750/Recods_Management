"use client"

import { useState } from "react"
import FileUpload from "@/components/FileUpload"
import RecordList from "@/components/RecordList"
import SearchBar from "@/components/SearchBar"
import { useRecords } from "@/hooks/useRecords"

export default function Home() {
  const { records, addRecords, updateRecord, deleteRecord } = useRecords()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = records.filter(
    (record) =>
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Client Records Management</h1>
      <FileUpload onUpload={addRecords} />
      <SearchBar onSearch={setSearchTerm} />
      <RecordList records={filteredRecords} onUpdate={updateRecord} onDelete={deleteRecord} />
    </div>
  )
}

