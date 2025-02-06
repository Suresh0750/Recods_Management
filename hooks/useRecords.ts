import { useState, useEffect } from "react"
import type {Record} from '@/types/Record'



// * Custom Hook 

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([])
  const [isSetRecord,setIsSetRecord] = useState<Boolean>(false)  // * used to aviod the empty data add while refresh page 

  useEffect(() => {
    const storedRecords = localStorage.getItem("records")
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords))
    }
  }, [])

  useEffect(() => {
    if(isSetRecord){
      localStorage.setItem("records", JSON.stringify(records))
      setIsSetRecord(false)
    }
  }, [records])

  // * add recods  
  const addRecords = (newRecords: Record[]) => {
    setIsSetRecord(true)
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
    setIsSetRecord(true)
    setRecords((prevRecords) =>
      prevRecords.map((record) => (record.id === id ? { ...record, ...updatedRecord } : record)),
    )
  }

  // * delete record
  const deleteRecord = (email: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.email !== email))
    setIsSetRecord(true)
  }

  // * check the exist email for update data
  const existRecord = (email:string,records:Record[])=>{
    console.log(email)
    console.log(records)
    return records.find((record:Record)=>record?.email===(email)?.trim())
  }

  return { records, addRecords, updateRecord, deleteRecord,existRecord }
}