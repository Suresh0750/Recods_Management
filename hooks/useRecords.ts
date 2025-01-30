import { useState, useEffect } from "react"
import type {Record} from '@/types/Record'
import { isValidator } from "@/utils/validate"


// * Custom Hook 

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

  // * add recods 
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

  // * Update Record
  const updateRecord = (id: string, updatedRecord: Partial<Record>) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) => (record.id === id ? { ...record, ...updatedRecord } : record)),
    )
  }

  // * delete record
  const deleteRecord = (id: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id))
  }

  // * check the exist email for update data
  const existRecord = (email:string)=>{
        return records.find((record:Record)=>record?.email===email)
  }

  return { records, addRecords, updateRecord, deleteRecord,existRecord }
}
