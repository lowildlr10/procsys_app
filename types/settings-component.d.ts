type UserProfileProps = {
  user: UserType;
};

type UserProfileUpdateSectionType = 'information' | 'signature';

type UserProfileFormProps = {
  user: UserType;
};

type SignatureFormProps = {
  user: UserType;
};

type AvatarFormProps = {
  user: UserType;
};

type SignatureFormProps = {
  user: UserType;
};

type DivisionSectionProps = {
  permissions: string[];
};

type RolesProps = {
  permissions: string[];
};

type UsersProps = {
  permissions: string[];
};

type LibraryProps = {
  permissions: string[];
};

type GeneralResponse = [
  url: string,
  search: string,
  page: number,
  perPage: number,
  columnSort: string,
  sortDirection: string,
  paginated: boolean,
];

type DivisionResponse = {
  data: DivisionType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type RolesResponse = {
  data: RoleType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type UsersResponse = {
  data: UserType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type FundingSourcesResponse = {
  data: FundingSourceType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type ItemClassificationsResponse = {
  data: ItemClassificationType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type MfoPapsResponse = {
  data: MfoPapType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type ProcurementModesResponse = {
  data: ProcurementModeType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type PaperSizesResponse = {
  data: PaperSizeType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type SignatoriesResponse = {
  data: SignatoryType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type SuppliersResponse = {
  data: SupplierType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type UacsClassificationsResponse = {
  data: UacsCodeClassificationType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type UacsCodesResponse = {
  data: UacsCodeType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

type UnitIssuesResponse = {
  data: UnitIssueType[];
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};
