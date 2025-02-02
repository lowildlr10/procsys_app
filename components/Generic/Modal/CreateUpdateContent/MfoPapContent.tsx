import { Stack, Switch, TextInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';

const MfoPapContentClient = ({
  data,
  handleCreateUpdate,
  setPayload,
}: ModalMfoPapContentProps) => {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      code: data?.code ?? '',
      description: data?.description ?? '',
      active: data?.active ?? false,
    },
  });

  useEffect(() => {
    setPayload(form.values);
  }, [form.values]);

  return (
    <form
      onSubmit={form.onSubmit(() => handleCreateUpdate && handleCreateUpdate())}
    >
      <Stack>
        <TextInput
          label='Code'
          placeholder='Code'
          value={form.values.code}
          onChange={(event) =>
            form.setFieldValue('code', event.currentTarget.value)
          }
          error={form.errors.code && ''}
          size={'sm'}
          required
        />
        <TextInput
          label='Description'
          placeholder='Description'
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue('description', event.currentTarget.value)
          }
          error={form.errors.description && ''}
          size={'sm'}
        />
        <Switch
          label={'Status'}
          my={20}
          onLabel='Active'
          offLabel='Inactive'
          color={'var(--mantine-color-secondary-9)'}
          checked={form.values.active}
          labelPosition={'left'}
          fw={500}
          sx={{ cursor: 'pointer' }}
          size={'sm'}
          onChange={(event) =>
            form.setFieldValue('active', event.currentTarget.checked)
          }
        />
      </Stack>
    </form>
  );
};

export default MfoPapContentClient;
