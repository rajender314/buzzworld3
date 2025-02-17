export type PricingRuleFormProps = {
  supplier: string;
  type: string;
  type_value: string;
  discount_codes: string;
  fixed_value: string;
  item_range_specification: string;
  starting_with: string;
  ending_with: string;
  items?: string;
};
export type PricingConfiguatorFormProps = {
  account_type: string;
  organizations_id: string;
  date_range: any;
  pricing_rules: Array<PricingRuleFormProps>;
};
