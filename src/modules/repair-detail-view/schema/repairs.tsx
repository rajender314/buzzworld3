export type StorageLocationProps = {
  id: string;
  storage_location: string;
  serial_number: string;
};
export type SerialNumberProps = {
  id: string;
  serial_number: string;
};
export type StoargeParamsProps = {
  repairs_id: string;
  storage_location_array: Array<StorageLocationProps>;
  internal_item_notes?: any;
  // serial_number_array:Array<SerialNumberProps>
};

export type RepairItemListProps = {
  description: string;
  id: string;
  manufacturer: string;
  manufacturer_id: string;
  part_number: string;
  priority: string;
  quantity: number;
  repairs_id: string;
  serial_number?: string | null;
  status: string;
  storage_location?: string;
  isChecked?: boolean;
};

export type RouteParams = {
  id: string;
};
export type VendorListProps = {
  code: string;
  description: string;
  id: string;
  name: string;
  status: string;
  key?: string;
  label: string;
  value: string;
};
export type ActivityProps = {
  date: string;
  time: string;
  actor: string;
  message: string;
  status: string;
  image_url?: string;
  status_code: string;
  stock_code?: string;
};
export type SelectProps = {
  label: string;
  value: string;
};
export type RepairInfoProps = {
  assignee: SelectProps;
  assignee_id: string;
  contact_name: string;
  contact_phone_number: string;
  created_date: string;
  customer_id: string;
  customer_name: SelectProps;
  email_id: string;
  priority: string;
  repair_statuses_id: string;
  rma_number: string;
  sales_person: string;
  syspro_id: string;
  status?: SelectProps;
  isCancelclicked?: boolean;
};
export type RepairDetailsProps = {
  repairDetails: RepairInfoProps;
  success: boolean;
  section?: string;
  notesToCustomer?: any;
};

export type RepairItemGridProps = {
  list: RepairItemListProps[];
  total_count: number;
  headers: any;
  global_status: string;
};
export type PartInfoFlagProps = {
  title: string;
  repairItemId?: string;
  status?: string;
};

export type InternalNotesProps = {
  created_by: string;
  created_date: string;
  id: string;
  image_url: string | null;
  is_delete_enable: boolean;
  is_edit_enable: boolean;
  notes: string;
  isEditMsg: boolean;
  is_edited: boolean;
  last_modified_date: string;
  attachments: any;
};

export type CustomerNotesProps = {
  full_name: string;
  id: string;
  image_url: string | null;
  last_modified_date: string;
  note: string;
  object_id: string;
  object_type_code: string;
  subject: string;
};
