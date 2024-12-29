
import { ErrorBoundary } from "react-error-boundary";

export async function LiveErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
}

async function Fallback() {
  "use server";
  return null;
}
