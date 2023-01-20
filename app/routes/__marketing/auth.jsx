import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL().searchParams;
  const authMode = searchParams.get('mode') || 'login';
  const formData = request.formData();
  const credentials = Object.fromEntries(formData);
  if (authMode === 'login') {
    //login logic
  } else {
    //signup login
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
