export interface IPatientComorbid {
  id: number;
  notes: string;
  created_by_name: string;
  updated_by_name: string;
  is_editable: boolean;
  message: string;
  condition_value_ids: number[];
}

export interface ICreatePatientComorbid {
  condition_value_ids: { id?: number }[] | number[];
  notes?: string;
  id?: number;
  patient_id?: number;
}

export interface IComorbidCommonProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (formData: ICreatePatientComorbid) => Promise<void>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isBtnDisable: boolean
  setIsBtnDisable: React.Dispatch<React.SetStateAction<boolean>>
  sheetOpen: boolean
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  openSheet: () => void
  currentComorbidConditions: IPatientComorbid | undefined
  setCurrentComorbidConditions: React.Dispatch<React.SetStateAction<IPatientComorbid | undefined>>
}
