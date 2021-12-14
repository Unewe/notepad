import React, { useCallback, useState } from 'react';
import authenticationStore from '../../store/authentication';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../models/user';
import UsersService from '../../services/users';
import { observer } from 'mobx-react-lite';

export const Registration: React.FC = observer((): React.ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest & { repeat: string }>();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleClose = useCallback(() => {
    authenticationStore.registrationModal = false;
    reset();
  }, [reset]);

  const submit = (data: LoginRequest) => {
    UsersService.register(data).catch((reason) => {
      setError(reason);
    });

    setTimeout(() => setError(undefined), 3000);
  };

  return (
    <Dialog
      maxWidth={'xs'}
      open={authenticationStore.registrationModal}
      onClose={handleClose}
    >
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <DialogContentText sx={error ? { color: 'red' } : undefined}>
          {error ||
            'Для полноценного доступа к сайту необходимо зарегистрироваться.'}
        </DialogContentText>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(submit)}
        >
          <TextField
            autoFocus
            margin='dense'
            label='Логин'
            fullWidth
            variant='outlined'
            sx={{ mt: 3 }}
            error={!!errors.username}
            {...register('username', { required: true, minLength: 3 })}
          />
          <TextField
            margin='dense'
            label='Пароль'
            type='password'
            fullWidth
            variant='outlined'
            error={!!errors.password}
            {...register('password', { required: true, minLength: 3 })}
          />
          <TextField
            margin='dense'
            label='Повторите пароль'
            // type="password"
            fullWidth
            variant='outlined'
            error={!!errors.repeat}
            {...register('repeat', {
              required: true,
              minLength: 3,
              validate: (value) => value === getValues().password,
            })}
          />
          <Button
            type={'submit'}
            sx={{ mt: 3, mb: 0.5 }}
            size={'large'}
            variant='outlined'
            fullWidth
          >
            Зарегистрироваться
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
});
