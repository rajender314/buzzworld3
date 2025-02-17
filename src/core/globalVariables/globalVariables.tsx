const GlobalVariables = {
  routePath: window.location.pathname.substring(1).split('/')[0],
  repairItemHeaders: [
    {
      name: 'Part number / Description',
      styles: { textAlign: 'left' },
    },
    {
      name: 'Manufacturer',
    },
    {
      name: 'Customer Part Number',
    },
    {
      name: 'Quantity',
      styles: { textAlign: 'right' },
    },

    {
      name: 'Serial No',
    },
    {
      name: 'Priority',
    },
    {
      name: 'Storage Location',
    },
    {
      name: 'Status',
    },
    { name: 'Action' },
  ],
  radioItemList: [
    {
      id: 'radio-1',
      label: 'Repairable',
      value: 'repairable',
      name: 'radio',
      htmlFor: 'radio-1',
      checked: true,
    },
    {
      id: 'radio-2',
      label: 'Not Repairable',
      value: 'non_repairable',
      name: 'radio',
      htmlFor: 'radio-2',
      checked: false,
    },
    {
      id: 'radio-3',
      label: 'Repairable-Outsource',
      value: 'outsource',
      name: 'radio',
      htmlFor: 'radio-3',
      checked: false,
    },
  ],
  properties: [
    { label: 'Evolution Summary', value: 'evolution summary' },
    { label: 'Evolution CheckBox', value: 'evolution checkBox' },
    { label: 'Evolution Textbox', value: 'evolution textbox' },
  ],
  propertiy: [
    { label: 'Evolution Summary1', value: 'evolution summary1' },
    { label: 'Evolution CheckBox2', value: 'evolution checkBox2' },
    { label: 'Evolution Textbox3', value: 'evolution textbox3' },
  ],
  SpPreviewGridHeaders: [
    // {
    //    field: 'selection',
    //    headerName: '',
    //    headerCheckboxSelection: true,
    //    checkboxSelection: (params: any) => { // Só deixa exibir as linhas isEnabled
    //      return true
    //    },
    //    lockPosition: true,
    //    //cellRenderer: (params: any) => {
    //    //      return `<input type="checkbox" />`;

    //    //}
    //  },
    // { field: 'supplier', headerName: 'Supplier', headerCheckboxSelection: true,   checkboxSelection: (params: any) => { // Só deixa exibir as linhas isEnabled
    //        return true
    //      },},
    { field: 'supplier', headerName: 'Supplier' },
    { field: 'stock_code', headerName: 'Stock Code' },
    { field: 'discount_code', headerName: 'Discount Code' },
    { field: 'start_date', headerName: 'Start Date' },
    { field: 'end_date', headerName: 'End Date' },
    { field: 'type', headerName: 'Type' },
    { field: 'type_value', headerName: 'Value' },
    { field: 'fixed_value', headerName: 'Fixed Value' },
  ],
  SpBreadCrumbList: [
    { id: 'pricing', name: 'Pricing' },
    { id: 'special-pricing', name: 'Non Standard Pricing' },
    { id: 'pricing-rules', name: 'Pricing Rules' },
  ],
  repairPriorityLevel: [
    { label: 'Emergency Breakdown', value: 'emergency_breakdown' },
    { label: 'Warranty', value: 'warranty' },
    { label: 'Rush', value: 'rush' },
    { label: 'Standard', value: 'standard' },
  ],
  repairAssignLevel: [
    { label: 'Choose', value: 'choose' },
    { label: 'Front-End', value: 'front End' },
    { label: 'Back-End', value: 'back End' },
  ],
  repairCompetitions: [
    { label: 'Budgetary', value: 'budgetary' },
    { label: 'Real', value: 'real' },
  ],

  repairCompetition: [
    { label: 'Less 30 Days', value: 'less 30 days' },
    { label: '30 to 60 days', value: '30 to 60 Days' },
    { label: 'greater than 60 days', value: 'Greater than 60 days' },
  ],

  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: 'right',
    defaultToolPanel: '',
    hiddenByDefault: '',
  },
  technicalData: [
    { label: 'Item1', value: 'item1' },
    { label: 'Item2', value: 'item2' },
    { label: 'Item3', value: 'item3' },
  ],
};
export default GlobalVariables;
