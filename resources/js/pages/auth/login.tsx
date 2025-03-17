import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type LoginForm = {
  identification: string;
  password: string;
};

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    identification: '',
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onSuccess: () => {
        toast.info('Bem vindo!');
      },
      onError: (errors) => {
        if (errors.identification || errors.password) {
          if (errors.identification) {
            errors.identification = 'A identificação informada está incorreta';
          }
          if (errors.password) {
            errors.password = 'A senha informada está incorreta.';
          }
        }
      },
      onFinish: () => {
        reset('password');
      },
    });
  };

  return (
    <AuthLayout title="Faça login no Metrol" description="Insira sua identificação e sua senha abaixo">
      <Head title="Login" />

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="identification">Identificação</Label>
            <Input
              id="identification"
              type="text"
              autoFocus
              tabIndex={1}
              value={data.identification}
              onChange={(e) => setData('identification', e.target.value)}
              placeholder="Insira sua identificação"
              autoComplete="username"
              required
            />
            <InputError message={errors.identification} />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <Input
              id="password"
              type="password"
              tabIndex={2}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Insira sua senha"
              autoComplete="current-password"
              required
            />
            <InputError message={errors.password} />
          </div>

          <Button type="submit" className="mt-4 w-full cursor-pointer" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
