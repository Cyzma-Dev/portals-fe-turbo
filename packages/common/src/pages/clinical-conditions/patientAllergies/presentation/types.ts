export interface IPatientAllergies {
  id: number;
  notes: string;
  created_by_name: string;
  updated_by_name: string;
  is_editable: boolean;
  message: string;
  condition_value_ids: number[];
}

export interface ICreatePatientAllergies {
  condition_value_ids: { id?: number }[] | number[];
  notes?: string;
  id?: number;
}

export interface IAllergiesCommonProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (formData: ICreatePatientAllergies) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isBtnDisable: boolean;
  setIsBtnDisable: React.Dispatch<React.SetStateAction<boolean>>;
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSheet: () => void;
  currentAllergies: IPatientAllergies | undefined;
  setCurrentAllergies: React.Dispatch<React.SetStateAction<IPatientAllergies | undefined>>;
}
