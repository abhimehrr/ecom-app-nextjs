import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/app/auth";

import { Button } from "@/components/ui/button";

const LoginPage = async () => {
  const session = await auth();

  if (session) return redirect("/u/my-account");

  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-background flex item-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[350px] min-h-[35px] max-h-[450px] border-2 border-primary/50 rounded-lg overflow-y-scroll">
          <div className="p-5">
            <div className="space-y-2 text-center">
              <h1 className="text-xl font-bold tracking-tight">Login</h1>
              <p className="text-primary/80">or create an account</p>
            </div>
            <div className="my-8 space-y-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirectTo: "/u/orders",
                  });
                }}
              >
                <Button size="lg" className="w-full">
                  <div className="w-full flex items-center justify-center gap-4">
                    <Image
                      src={"/google-icon.svg"}
                      alt="google-log-icon"
                      width={100}
                      height={100}
                      className="size-10"
                    />
                    <p className="font-medium">Continue with Google</p>
                  </div>
                </Button>
              </form>
            </div>
          </div>
          <hr />
          <div className="p-4 space-y-4">
            <p className="text-primary/80 text-xs">
              We securely authenticate you with service providers, ensuring your
              data stays safe
            </p>
            <p className="text-primary/80 text-xs">
              By signing in, you agree to our
              <span className="text-rose/80 mx-2">
                Terms of Service and Privacy
              </span>
              Policy, giving your consent for us to process your information in
              accordance with these policies.
            </p>
            <p className="text-primary text-center text-xs">
              &copy; All Right Reserved,
              <span className="text-rose/80 mx-2">eCom</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
