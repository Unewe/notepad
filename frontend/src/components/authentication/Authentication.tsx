import React, {useCallback, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle, Link,
  TextField
} from "@mui/material";
import {observer} from "mobx-react-lite";
import authenticationStore from "../../store/authentication";
import {useForm} from "react-hook-form";
import {LoginRequest} from "../../models/user";
import UsersService from "../../services/users";

export const Authentication: React.FC = observer((): React.ReactElement => {
  const {register, handleSubmit, reset, formState: {errors,}} = useForm<Partial<LoginRequest>>();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleClose = useCallback(() => {
    authenticationStore.authModal = false;
    reset();
  }, [reset]);

  const submit = (data: LoginRequest) => {
    UsersService.login(data).then(handleClose).catch(reason => {
      setError(reason);
      setTimeout(() => setError(undefined), 3000);
    });
  }

  const registration = () => {
    authenticationStore.authModal = false;
    authenticationStore.registrationModal = true;
  }

  return (
    <Dialog maxWidth={"xs"} open={authenticationStore.authModal} onClose={handleClose}>
      <DialogTitle>Авторизация</DialogTitle>
      <DialogContent>
        <DialogContentText sx={error ? {color: "red"} : undefined}>
          {error || "Чтобы войти на сайт нужно ввести логи и пароль."}
        </DialogContentText>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Логин"
            fullWidth
            variant="outlined"
            sx={{mt: 3}}
            error={!!errors.username}
            {...register("username", {required: true, minLength: 3})}
          />
          <TextField
            margin="dense"
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            {...register("password", {required: true, minLength: 3})}
          />
          <Button type={"submit"} sx={{mt: 3, mb: .5}} size={"large"} variant="outlined" fullWidth>Войти</Button>
        </Box>
        <DialogContentText sx={{float: "right"}}>
          или пройти <Link onClick={registration} sx={{cursor: "pointer"}}>регистрацию</Link>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
});