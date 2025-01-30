import { useState, useEffect } from "react"
import type {Record} from '@/types/Record'
import { isValidator } from "@/utils/validate"

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    const storedRecords = localStorage.getItem("records")
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records))
  }, [records])

  const addRecords = (newRecords: Record[]) => {
    setRecords((prevRecords) => {
      const uniqueRecords = [...prevRecords]
      const emailSet = new Set(prevRecords.map((record) => record.email))

      newRecords.forEach((newRecord) => {
        if (!emailSet.has(newRecord.email)) {
          uniqueRecords.push(newRecord)
          emailSet.add(newRecord.email)
        }
      })

      return uniqueRecords
    })
  }

  const updateRecord = (id: string, updatedRecord: Partial<Record>) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => (record.id === id ? { ...record, ...updatedRecord } : record)),
    )
  }

  const deleteRecord = (id: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id))
  }

  return { records, addRecords, updateRecord, deleteRecord }
}
