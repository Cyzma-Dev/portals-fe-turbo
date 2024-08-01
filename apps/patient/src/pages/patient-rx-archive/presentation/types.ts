export interface IRxArchiveList {
  days_supply: number,
  drug_name: string,
  expiration_date: string,
  id: number,
  is_active: boolean,
  last_fill_date: string,
  ndc: string,
  next_fill_date: string,
  patient: number,
  patient_name: string,
  pharmacy: number,
  pharmacy_name: string,
  pharmacy_note: null | string,
  physician: number,
  physician_name: string,
  refill_remaining: number,
  refill_request_status: null | string,
  remaining_quantity: number,
  rx_fills: [],
  rx_number: string,
  rx_request_status: null | string,
  times_filled: string,
  written_date: string,
  written_quantity: number,
  written_refills: number
}






