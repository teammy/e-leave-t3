import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginInput, type RegisterInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as validators from "../helpers/validators";
import { capitalize } from "lodash";
import FormField from "~/features/ui/components/form/FormField";
import Link from "next/link";

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
      {isRegisterForm && (
        <FormField
          id="name"
          label="Name"
          placeholder="Enter Your Name"
          error={errors.name?.message}
          {...register("name")}
        ></FormField>
      )}
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter Your Email"
        error={errors.email?.message}
        {...register("email")}
      ></FormField>
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter Your password"
        error={errors.password?.message}
        {...register("password")}
      ></FormField>
      <div>
        <button type="submit">{kind}</button>
        <Link href={isRegisterForm ? "/auth/signin" : "/auth/signup"}>
          {isRegisterForm
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
