import SigninButton from "./SigninButton";

export function Signin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-gray-500 dark:text-gray-400">

            Sign in to your account to continue.
          </p>
        </div>

        <SigninButton />
      </div>
    </div>
  );
}


