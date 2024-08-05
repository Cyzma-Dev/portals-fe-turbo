export interface IPatientHighRisk {
  id: number;
  notes: string;
  created_by_name: string;
  updated_by_name: string;
  is_editable: boolean;
  message: string;
  condition_value_ids: number[];
}

export interface ICreatePatientHighRisk {
  condition_value_ids: { id?: number }[] | number[];
  notes?: string;
  id?: number;
}

export interface IHighRiskCommonProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (formData: ICreatePatientHighRisk) => void
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isBtnDisable: boolean
  setIsBtnDisable: React.Dispatch<React.SetStateAction<boolean>>
  sheetOpen: boolean
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  openSheet: () => void
  currentHighRiskCondition: IPatientHighRisk | undefined
  setCurrentHighRiskCondition: React.Dispatch<React.SetStateAction<IPatientHighRisk | undefined>>
}
