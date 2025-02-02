import { Divider, Paper, Stack, Switch, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import DynamicSelect from '../../DynamicSelect';
import DynamicAutocomplete from '../../DynamicAutocomplete';

const SignatoryContentClient = ({
  data,
  handleCreateUpdate,
  setPayload,
}: ModalSignatoryContentProps) => {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      user_id: data?.user_id ?? '',
      details: JSON.stringify(data?.details ?? []),
      active: data?.active ?? false,
    },
  });
  const [detailFields, handlers] = useListState<SignatoryDetailsFieldType>([
    {
      document: 'pr',
      label: 'Purchase Request Document',
      details: [
        {
          checked: false,
          label: 'Cash Availability',
          signatory_type: 'pr_cash_availability',
          position: '',
        },
        {
          checked: false,
          label: 'Approved By',
          signatory_type: 'pr_approved_by',
          position: '',
        },
      ],
    },
    {
      document: 'rfq',
      label: 'Request for Quotation Document',
      details: [
        {
          checked: false,
          label: 'Approval',
          signatory_type: 'rfq_approval',
          position: '',
        },
        {
          checked: false,
          label: 'Canvassers',
          signatory_type: 'rfq_canvassers',
          position: '',
        },
      ],
    },
    {
      document: 'po',
      label: 'Purchase/Job Order Document',
      details: [
        {
          checked: false,
          label: 'Authorized Official',
          signatory_type: 'po_authorized_official',
          position: '',
        },
      ],
    },
    {
      document: 'iar',
      label: 'Inspection and Acceptance Report Document',
      details: [
        {
          checked: false,
          label: 'Inspection',
          signatory_type: 'iar_inspection',
          position: '',
        },
        {
          checked: false,
          label: 'Acceptance',
          signatory_type: 'iar_acceptance',
          position: '',
        },
      ],
    },
    {
      document: 'ris',
      label: 'Requisition and Issue Slip Document',
      details: [
        {
          checked: false,
          label: 'Approved By',
          signatory_type: 'ris_approved_by',
          position: '',
        },
        {
          checked: false,
          label: 'Issued By',
          signatory_type: 'ris_issued_by',
          position: '',
        },
      ],
    },
    {
      document: 'ics',
      label: 'Inventory Custodian Slip Document',
      details: [
        {
          checked: false,
          label: 'Received From',
          signatory_type: 'ics_received_from',
          position: '',
        },
      ],
    },
    {
      document: 'are',
      label: 'Acknowledgement Receipt for Equipment Document',
      details: [
        {
          checked: false,
          label: 'Received From',
          signatory_type: 'are_received_from',
          position: '',
        },
      ],
    },
  ]);

  useEffect(() => {
    form.setFieldValue(
      'details',
      JSON.stringify(
        detailFields
          .map((detail) =>
            detail.details
              .filter((subDetail) => subDetail.checked)
              .map((subDetail) => ({
                document: detail.document,
                signatory_type: subDetail.signatory_type,
                position: subDetail.position,
              }))
          )
          .flat()
      )
    );
  }, [detailFields]);

  useEffect(() => {
    if (data?.details) {
      data.details.forEach((detail) => {
        handlers.setState((current) =>
          current.map((value) => {
            const isMatching = value.document === detail.document;

            return {
              ...value,
              details: isMatching
                ? value.details.map((subDetail) => ({
                    ...subDetail,
                    checked:
                      subDetail.signatory_type === detail.signatory_type
                        ? true
                        : subDetail.checked,
                    position:
                      subDetail.signatory_type === detail.signatory_type
                        ? (detail?.position ?? '')
                        : subDetail.position,
                  }))
                : value.details,
            };
          })
        );
      });
    }
  }, [data]);

  useEffect(() => {
    setPayload(form.values);
  }, [form.values]);

  return (
    <form
      onSubmit={form.onSubmit(() => handleCreateUpdate && handleCreateUpdate())}
    >
      <Stack>
        <DynamicSelect
          endpoint={'/accounts/users'}
          endpointParams={{
            paginated: false,
            show_all: true,
            show_inactive: true,
          }}
          column={'fullname'}
          label='User'
          value={form.values.user_id}
          size={'sm'}
          onChange={(value) => form.setFieldValue('user_id', value)}
          required
        />

        <Switch
          label={'Status'}
          mb={20}
          onLabel='Active'
          offLabel='Inactive'
          color={'var(--mantine-color-secondary-9)'}
          checked={form.values.active}
          labelPosition={'left'}
          fw={500}
          size={'sm'}
          sx={{ cursor: 'pointer' }}
          onChange={(event) =>
            form.setFieldValue('active', event.currentTarget.checked)
          }
        />

        {detailFields.map((detail) => (
          <Paper key={detail.document} shadow={'xs'} p={'lg'} withBorder>
            <Stack gap={'sm'}>
              <Text fw={500}>{detail.label}</Text>
              <Divider />

              {detail.details.map((subDetail) => (
                <Stack key={subDetail.signatory_type} mb={'sm'} pt={'sm'}>
                  <Switch
                    label={subDetail.label}
                    placeholder={
                      subDetail.checked ? subDetail.label : 'Disabled...'
                    }
                    color={'var(--mantine-color-primary-9)'}
                    size={'sm'}
                    checked={subDetail.checked}
                    onChange={(e) =>
                      handlers.setState((current) =>
                        current.map((currentDetail) => ({
                          ...currentDetail,
                          details: currentDetail.details.map(
                            (currentSubDetail) => ({
                              ...currentSubDetail,
                              checked:
                                currentSubDetail.signatory_type ===
                                subDetail.signatory_type
                                  ? e.target.checked
                                  : currentSubDetail.checked,
                              position:
                                currentSubDetail.signatory_type ===
                                subDetail.signatory_type
                                  ? ''
                                  : currentSubDetail.position,
                            })
                          ),
                        }))
                      )
                    }
                  />

                  {subDetail.checked && (
                    <Stack display={!subDetail.checked ? 'none' : undefined}>
                      <DynamicAutocomplete
                        endpoint={'/accounts/designations'}
                        endpointParams={{ paginated: false }}
                        column={'designation_name'}
                        size={'sm'}
                        label={'Designation'}
                        value={subDetail.position}
                        onChange={(value) =>
                          handlers.setState((current) =>
                            current.map((currentDetail) => ({
                              ...currentDetail,
                              details: currentDetail.details.map(
                                (currentSubDetail) => ({
                                  ...currentSubDetail,
                                  position:
                                    currentSubDetail.signatory_type ===
                                    subDetail.signatory_type
                                      ? value
                                      : currentSubDetail.position,
                                })
                              ),
                            }))
                          )
                        }
                        required={subDetail.checked}
                        readOnly={!subDetail.checked}
                      />
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </form>
  );
};

export default SignatoryContentClient;
