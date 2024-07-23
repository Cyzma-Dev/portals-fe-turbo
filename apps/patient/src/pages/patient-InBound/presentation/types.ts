export interface IInBoundList {
  action: "string",
  created_date: "date-time",
  document_type: "string",
  drug_name: "string",
  fax: "number",
  id: "number",
  is_active: "boolean",
  is_deleted: "boolean",
  note: "string",
  patient: "number",
  patient_name: "string",
  pharmacy: "number",
  physician: "number",
  physician_name: "string",
  rec_id: "string",
  receiver: "string",
  receiver_name: "string",
  request_type: "string",
  rx: "number",
  rx_filled_date: "date",
  rx_number: "string",
  sender: "string",
  sender_name: "string",
  status: "string",
  updated_by_name: "string",
  updated_date: "date-time",
  url: "uri"
}

export interface IInBoundServiceProps {
  id: number
  sender: string
  receiver: string
  document_type: string
  url: string
  note: string
  created_date: string
  is_active: boolean
  is_deleted: boolean
  patient: number
  physician: number
  pharmacy: number
  fax: number
  rec_id: string
  document: string
  rx_number: number
  status: string
}




