import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginInput, type RegisterInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as validators from "../helpers/validators";
import { capitalize } from "lodash";
import FormField from "~/features/ui/components/form/FormField";


export type AuthFormProps =
  | {
      kind: "register";
      onSubmit: SubmitHandler<RegisterInput>;
    }
  | {
      kind: "login";
      onSubmit: SubmitHandler<LoginInput>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const isRegisterForm = kind === "register";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    typeof onSubmit extends SubmitHandler<RegisterInput>
      ? RegisterInput
      : LoginInput
  >({
    resolver: zodResolver(
      kind === "register"
        ? validators.registerValidator
        : validators.loginValidator,
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{capitalize(kind)}</h2>
      {
        isRegisterForm && (
         <FormField
         id='name'
         label='Name'
         placeholder='Enter Your Name'
         error={errors.name?.message}
          {...register('name')}
         >
         </FormField>
      )}
      <div>
            <label htmlFor="email">email</label>
            <input type="email" id="email" placeholder="Enter Your email" {...register('email')} />
            {errors.email && <div>{errors.email.message}</div>}
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" placeholder="Enter Your password" {...register('password')} />
            {errors.password && <div>{errors.password.message}</div>}
          </div>
          <div><button type="submit" >{kind}</button></div>
    </form>
  );
};

export default AuthForm;
