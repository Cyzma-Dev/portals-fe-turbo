export interface IPatientDocument {
  document_name: string;
  subject: number;
  note: string;
  message: string;
  id: number;
}

export interface ICreatePatientDocument extends IPatientDocument {
  document: string;
}

export interface IUploadDocument {
  id: number
  patient: number
  subject: number
  document_name: string
  subject_name: string
  note: string
  document: string
  created_date: string
  created_by: any
  updated_date: string
  updated_by: any
  is_active: boolean
  is_deleted: boolean
  document_type: string
}

export interface IPatientDocuments {
  patient_id: number
  id: number
  document_name: string
  document_type: string
  subject: number
  subject_name: string
  note: string
  created_by: string
  created_date: string
  updated_date: string
  uploaded_by_physician: any
  uploaded_by_pharmacy: any
  patient_document: any
}

export interface IDocumentsCommonProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (formData: ICreateDocuments) => void
  isLoading: boolean
  isBtnDisable: boolean
  sheetOpen: boolean
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  openSheet: () => void
  currentDocument: IPatientDocument | undefined
  setCurrentDocument: React.Dispatch<React.SetStateAction<IPatientDocument | undefined>>
}

export interface ICreateDocuments {
  document: Document
  document_name: string
  note?: string
  subject: number

}

export interface IPreviewDocumentsProps {
  previewSheetOpen: boolean
  setPreviewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  viewerFile: any
}



export interface IPreviewDocuments {
  document: File
  document_name: string
  note: string
  subject: number
  id: number

}