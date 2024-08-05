export interface IOutBoundList {
  created_date: Date;
  document_type: "pdf";
  drug_name: string;
  fax: number;
  id: number;
  is_active: boolean;
  is_deleted: boolean;
  note: string | null;
  patient: number;
  patient_name: string;
  pharmacy: number;
  physician: number;
  physician_name: string;
  rec_id: string;
  receiver: string;
  receiver_name: string;
  request_type: string;
  rx_filled_date: Date;
  rx_number: string;
  sender: string;
  sender_name: string;
  status: string;
  updated_by_name: string;
  updated_date: Date;
  url: string;
}

export interface IOutBoundServiceProps {
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




