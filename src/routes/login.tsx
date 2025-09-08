import { login } from "@/api/auht";
import { authCredentialsSchema, type AuthCredentials } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@/store/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { login: createSession } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(authCredentialsSchema),
  });
  const { mutate: doLogin, reset } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      reset();
      createSession(data);
    },
  });
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  const onSubmit: SubmitHandler<AuthCredentials> = (data) => {
    doLogin(data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend=">
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          </legend>

          <label className="label">Correo</label>
          <input
            type="email"
            className="input"
            placeholder="example@domain.com"
            {...register("email")}
          />
          {emailError && <p className="text-error label">{emailError}</p>}

          <label className="label">Contraseña</label>
          <input
            type="password"
            className="input"
            placeholder="Contraseña"
            {...register("password")}
          />
          {passwordError && <p className="text-error label">{passwordError}</p>}

          <button className="btn btn-primary mt-4">Iniciar</button>
        </fieldset>
      </form>
    </div>
  );
}
