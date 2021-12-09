import React, {useCallback} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import {observer} from "mobx-react-lite";
import authenticationStore from "../../store/authentication";
import {useForm} from "react-hook-form";
import {LoginForm} from "../../models/user";
import UsersService from "../../services/users";

export const Authentication: React.FC = observer((): React.ReactElement => {

  const handleClose = useCallback(() => {
    authenticationStore.open = false;
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const submit = useCallback(data => {
    UsersService.login(data);
  }, []);

  return (
    <Dialog maxWidth={"xs"} open={authenticationStore.open} onClose={handleClose}>
      <DialogTitle>Авторизация</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы войти на сайт нужно ввести логи и пароль.
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
            error={!!errors.username}
            {...register("username", { required: true, minLength: 3})}
          />
          <TextField
            margin="dense"
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            {...register("password", { required: true, minLength: 3})}
          />
          <Button type={"submit"} sx={{mt: 3}} size={"large"} variant="outlined" fullWidth>Войти</Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
});